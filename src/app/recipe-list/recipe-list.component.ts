import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/Recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(0, 'Carbonara Spaghetti', 'A very good dish.', 'https://www.tavolartegusto.it/wp/wp-content/uploads/2020/03/Carbonara-Spaghetti-alla-carbonara-Ricetta-Carbonara.jpg'),
    new Recipe(1, 'Margherita Pizza', 'The best pizza evah.', 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg')
  ]

  editingRecipe: Recipe = new Recipe(-1, '', '', '');

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeClick(recipeId: number): void {
    const idx = this.recipes.findIndex(recipe => recipe.id === recipeId);

    if(idx !== -1)
      this.editingRecipe = this.recipes[idx];
  }
}
