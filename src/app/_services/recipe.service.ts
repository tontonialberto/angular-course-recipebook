import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../_models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public recipeSelected = new BehaviorSubject<Recipe>(null);

  private recipes: Recipe[] = [
    new Recipe(0, 'Carbonara Spaghetti', 'A very good dish.', 'https://www.tavolartegusto.it/wp/wp-content/uploads/2020/03/Carbonara-Spaghetti-alla-carbonara-Ricetta-Carbonara.jpg'),
    new Recipe(1, 'Margherita Pizza', 'The best pizza evah.', 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg')
  ]

  constructor() { }

  public getAll(): Recipe[] {
    return this.recipes.slice();
  }
}
