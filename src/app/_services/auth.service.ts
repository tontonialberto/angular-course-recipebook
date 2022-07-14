import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

const API_KEY = 'AIzaSyD7MT-aEUFT_hRdQ0DwbLDQOyt81ez9tN0';

interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public signup(email: string, password: string): Observable<string> {
    const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    return this.authenticate(email, password, apiUrl);
  }

  public login(email: string, password: string): Observable<string> {
    const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
    return this.authenticate(email, password, apiUrl);
  }

  public authenticate(email: string, password: string, apiUrl: string): Observable<string> {
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
      map((res: FirebaseAuthResponse) => {
        return res.idToken ? res.idToken : null;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error?.error?.message);
      })
    );
  }
}
