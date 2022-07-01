import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/_services/recipe.service';
import { Recipe } from '../../_models/Recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe = null;

  private subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
