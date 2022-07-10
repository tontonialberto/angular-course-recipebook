import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private idCounter = 2; // Used as an "auto-increment" id generator

  private recipes: Recipe[] = [
    new Recipe(0, 'Carbonara Spaghetti', 'A very good dish.',
      'https://www.tavolartegusto.it/wp/wp-content/uploads/2020/03/Carbonara-Spaghetti-alla-carbonara-Ricetta-Carbonara.jpg',
      [
        new Ingredient('Spaghetti', '200gr'),
        new Ingredient('Guanciale', '100gr'),
        new Ingredient('Eggs', '3')
      ]
    ),
    new Recipe(1, 'Margherita Pizza', 'The best pizza evah.',
      'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg',
      [
        new Ingredient('Flour', '1kg'),
        new Ingredient('Tomato sauce', '200gr'),
        new Ingredient('Mozzarella', '100gr')
      ]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) { }

  public getAll(): Recipe[] {
    return this.recipes.slice();
  }

  public getById(id: number): Recipe {
    let result = this.recipes.find((r: Recipe) => id === r.id);
    
    if(undefined === result) {
      result = null;
    }

    return result;
  }

  public add(name: string, description: string, imagePath: string, ingredients: Ingredient[]): void {
    const recipe = new Recipe(++this.idCounter, name, 
      description, imagePath, ingredients);
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public addToShoppingList(ingredients: Ingredient[]): void {
    for(const ingredient of ingredients) {
      this.shoppingListService.add(ingredient.name, ingredient.quantity);
    }
  }

  public update(recipe: Recipe): boolean {
    const idx = this.recipes.findIndex(r => r.id === recipe.id);
    let result: boolean = false;

    if(-1 !== idx) {
      this.recipes[idx] = recipe;
      this.recipesChanged.next(this.recipes.slice());
      result = true;
    }

    return result;
  }
}
