import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../_models/recipe.model';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];

  private subRecipesChanged: Subscription;

  isLoading: boolean = false;

  constructor(private recipeService: RecipeService) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.subRecipesChanged = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipeService.fetchAll().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subRecipesChanged.unsubscribe();
  }
}
