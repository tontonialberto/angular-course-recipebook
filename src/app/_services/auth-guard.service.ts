import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { User } from '../_models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => { 
        return (user !== null) && (user.token !== null);
      })
    );
  }
}
