import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
    <app-bottom-navbar></app-bottom-navbar>
  `,
  styles: ['.container { margin-top: 70px; margin-bottom: 70px; }']
})
export class AppComponent {
}
