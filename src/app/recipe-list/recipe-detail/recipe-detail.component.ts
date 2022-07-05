import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/_models/ingredient.model';
import { RecipeService } from 'src/app/_services/recipe.service';
import { Recipe } from '../../_models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe = null;

  // Indicates that recipe ingredients have been successfully added to shopping list.
  // Used to show a success message in the UI.
  addedToShoppingList: boolean = false; 

  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.subscription = this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.recipe = recipe;
    //   }
    // );
    this.recipe = this.route.snapshot.data['recipe'];
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data.recipe;
      }
    )
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onAddToShoppingList(ingredients: Ingredient[]): void {
    this.recipeService.addToShoppingList(ingredients);
    this.addedToShoppingList = true;
    setTimeout(() => {
      this.addedToShoppingList = false;
    }, 5000);
  }
}
