import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
  }
}
