import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize, Subscriber } from 'rxjs';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if(this.loginMode) {
      // Call authService.login
    }
    else {
      this.authService.signup(email, password)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (token: string) => {
            if(token) {
              this.errorMessage = null;
              this.successMessage = `${email} has been registered successfully!`;
            }
          },
          error: (error: string) => {
            this.errorMessage = this.getSignupErrorMessage(error);
            this.successMessage = null;
          }
        });
    }
  }

  private getSignupErrorMessage(error: string): string {
    switch(error) {
      case 'INVALID_EMAIL':
        return 'The provided email is not valid!';
      case 'EMAIL_EXISTS':
        return 'There is already a user with the given email!';
      default:
        return '';
    }
  }
}
