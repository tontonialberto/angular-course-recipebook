import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit { 

  // Used for collapsible navbar on mobile devices.
  showLinks: boolean = false;

  openDropdown: boolean = false;

  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = (user !== null && user.token !== null);
    });
  }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.showLinks = !this.showLinks;
  }

  onSaveData(): void {
    this.recipeService.saveAll();
  }

  onFetchData(): void {
    this.recipeService.fetchAll();
  }
}
