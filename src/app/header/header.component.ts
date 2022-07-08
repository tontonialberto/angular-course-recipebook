import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit { 

  // Used for collapsible navbar on mobile devices.
  showLinks: boolean = false;

  openDropdown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.showLinks = !this.showLinks;
  }
}
