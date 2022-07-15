import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { User } from '../_models/user.model';

const API_KEY = 'AIzaSyD7MT-aEUFT_hRdQ0DwbLDQOyt81ez9tN0';

interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  public signup(email: string, password: string): Observable<string> {
    const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    return this.authenticate(email, password, apiUrl);
  }

  public login(email: string, password: string): Observable<string> {
    const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
    return this.authenticate(email, password, apiUrl);
  }

  private authenticate(email: string, password: string, apiUrl: string): Observable<string> {
    return this.http.post(apiUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        params: new HttpParams().set('key', API_KEY)
      }
    ).pipe(
      tap((res: FirebaseAuthResponse) => {
        if(res.idToken) {
          const expiresInSeconds: number = parseInt(res.expiresIn);
          const expDate: Date = new Date(new Date().getTime() + 1000 * expiresInSeconds);
          this.user$.next(new User(res.idToken, expDate));
        }
      }),
      map((res: FirebaseAuthResponse) => {
        return res.idToken ? res.idToken : null;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error?.error?.message);
      })
    );
  }
}
