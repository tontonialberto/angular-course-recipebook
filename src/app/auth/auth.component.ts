import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // If false, it's signup mode.
  loginMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

}
