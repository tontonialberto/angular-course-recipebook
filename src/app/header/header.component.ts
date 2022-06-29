import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Emitted when a nav link is clicked
  @Output('navigate') navigateEvent = new EventEmitter<string>(); 

  // Used for collapsible navbar on mobile devices.
  showLinks: boolean = false;

  openDropdown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.showLinks = !this.showLinks;
  }

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
  }

  onShoppingListClick(): void {
    this.navigateEvent.emit('Shopping List');
  }

  onRecipesClick(): void {
    this.navigateEvent.emit('Recipes');
  }
}
