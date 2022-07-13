import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

const API_URL = 'https://food-fa34d-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private idCounter = 2; // Used as an "auto-increment" id generator

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService,
    private http: HttpClient) {
    this.fetchAll();
  }

  /**
   * Get all the recipes from the backend 
   * and store a local copy.
   */
  public fetchAll(): void {
    this.http.get(API_URL + 'recipes.json')
      .pipe(
        map((res: { [key: string]: Recipe }) => {
          if (null === res) {
            return [];
          }
          else {
            return Object.keys(res).map(
              (key: string) => {
                return Recipe.fromRaw({ ...res[key], id: key });
              }
            );
          }
        })
      ).subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      });
  }

  /**
   * Note: returns the previously fetched local copy.
   */
  public getAll(): Recipe[] {
    return this.recipes.slice();
  }

  public getById(id: string): Recipe {
    let result = this.recipes.find((r: Recipe) => id === r.id);

    if (undefined === result) {
      result = null;
    }

    return result;
  }

  public add(
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]): Observable<string> {

    return this.http.post(API_URL + 'recipes.json',
      {
        name: name,
        description: description,
        imagePath: imagePath,
        ingredients: ingredients
      }
    ).pipe(
      map((res: { name: string }) => res.name),
      tap((newId: string) => {
        const recipe = new Recipe(newId, name, description, imagePath, ingredients);
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      })
    );
  }

  public addToShoppingList(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.shoppingListService.add(ingredient.name, ingredient.quantity);
    }
  }

  public update(recipe: Recipe): Observable<boolean> {
    const idx = this.recipes.findIndex(r => r.id === recipe.id);
    let result: Observable<boolean> = null;

    if (-1 === idx) {
      result = new Observable<boolean>((subscriber) => {
        subscriber.next(false);
      });
    }
    else {
      const endpoint = API_URL + `recipes/${recipe.id}.json`;
      result = this.http.patch(endpoint,
        {
          name: recipe.name,
          description: recipe.description,
          imagePath: recipe.imagePath,
          ingredients: recipe.ingredients
        }
      ).pipe(
        map(() => true),
        tap(() => {
          this.recipes[idx] = recipe;
          this.recipesChanged.next(this.recipes.slice());
        })
      );
    }

    return result;
  }

  public remove(id: string): boolean {
    const idx = this.recipes.findIndex(r => id === r.id);
    let result: boolean = false;

    if (-1 !== idx) {
      this.recipes.splice(idx, 1);
      this.recipesChanged.next(this.recipes.slice());
      result = true;
    }

    return result;
  }
}
