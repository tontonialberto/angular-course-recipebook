import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;

    if(!this.loginMode) {
      this.authService.signup(email, password)
        .subscribe((token: string) => {
          if(token) {
            alert('Sign Up Success!');
            console.log(token)
          }
        });
    }
  }
}
