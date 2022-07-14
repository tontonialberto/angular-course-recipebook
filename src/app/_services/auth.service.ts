import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
    return this.http.post(apiUrl + `?key=${API_KEY}`, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      map((res: FirebaseAuthResponse) => {
        return res.idToken ? res.idToken : null;
      })
    )
  }
}
