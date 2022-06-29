import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  activePage = '';

  onNavigationChange(page: string): void {
    this.activePage = page;
  }
}
