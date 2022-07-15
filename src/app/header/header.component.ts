import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy { 

  // Used for collapsible navbar on mobile devices.
  showLinks: boolean = false;

  openDropdown: boolean = false;

  isLoggedIn: boolean = false;

  private subUser: Subscription;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    this.subUser = this.authService.user$.subscribe((user: User) => {
      this.isLoggedIn = (user !== null && user.token !== null);
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
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
