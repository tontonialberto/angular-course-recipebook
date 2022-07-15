import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Observable, Subscriber } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // If false, it's signup mode.
  loginMode: boolean = true;
  
  @ViewChild('form') form: NgForm;

  errorMessage: string = null;

  isLoading: boolean = false;

  successMessage: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authCall, getErrorMessage, successMessage;
    if(this.loginMode) {
      authCall = this.authService.login.bind(this.authService);
      getErrorMessage = this.getLoginErrorMessage;
      successMessage = `Hello, ${email}!`;
    }
    else {
      authCall = this.authService.signup.bind(this.authService);
      getErrorMessage = this.getSignupErrorMessage;
      successMessage = `${email} has been registered successfully!`;
    }

    authCall(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (token: string) => {
          if(token) {
            this.errorMessage = null;
            this.successMessage = successMessage;
          }

          if(this.loginMode) {
            this.router.navigate(['/shopping-list']);
          }
        },
        error: (error: string) => {
          this.errorMessage = getErrorMessage(error);
          this.successMessage = null;
        }
      });
  }

  private getSignupErrorMessage(error: string): string {
    switch(error) {
      case 'INVALID_EMAIL':
        return 'The provided email is not valid!';
      case 'EMAIL_EXISTS':
        return 'There is already a user with the given email!';
      default:
        return error;
    }
  }

  private getLoginErrorMessage(error: string): string {
    switch(error) {
      case 'EMAIL_NOT_FOUND':
        return 'Could not find a user with the given email!';
      case 'INVALID_PASSWORD':
        return 'The password is wrong!'
      default:
        return error;
    }
  }
}
