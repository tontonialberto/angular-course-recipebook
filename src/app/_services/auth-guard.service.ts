import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { User } from '../_models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => {
        const isLoggedIn: boolean = (user !== null) && (user.token !== null);
        if(isLoggedIn) {
          return true;
        }
        else {
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
