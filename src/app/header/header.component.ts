import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit { 

  // Used for collapsible navbar on mobile devices.
  showLinks: boolean = false;

  openDropdown: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.showLinks = !this.showLinks;
  }

  onSaveData(): void {
    this.recipeService.saveAll().subscribe(
      (success: boolean) => {
        // Nothing to do.
      }
    )
  }
}
