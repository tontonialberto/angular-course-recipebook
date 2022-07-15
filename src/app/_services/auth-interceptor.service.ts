import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, take } from 'rxjs';
import { User } from '../_models/user.model';
import { API_KEY, URL_AUTH_LOGIN, URL_AUTH_SIGNUP, URL_DATA } from '../_shared/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let result: Observable<HttpEvent<any>>;

    if (req.url.includes(URL_AUTH_LOGIN) || req.url.includes(URL_AUTH_SIGNUP)) {
      req = req.clone({
        params: req.params.set('key', API_KEY)
      });
      result = next.handle(req);
    }
    else if (req.url.includes(URL_DATA)) {
      result = this.authService.user$.pipe(
        take(1),
        map((user: User) => user?.token),
        mergeMap((token: string) => {
          req = req.clone({
            params: req.params.set('auth', token)
          });
          return next.handle(req);
        })
      );
    }
    return result;
  }
}
