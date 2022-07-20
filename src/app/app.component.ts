import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
  `,
  styles: ['.container { margin-top: 70px; }']
})
export class AppComponent {
}
