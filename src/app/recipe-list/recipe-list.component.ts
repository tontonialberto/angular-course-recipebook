import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/Recipe.model';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  isRecipeSet: boolean = false;

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAll();
  }

  onRecipeClick(recipe: Recipe): void {
    this.isRecipeSet = true;
    this.recipeService.recipeSelected.next(recipe);
  }
}
