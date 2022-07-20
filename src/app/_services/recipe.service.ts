import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';
import { User } from '../_models/user.model';
import { URL_DATA } from '../_shared/constants';
import { AuthService } from './auth.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


  recipeSaved = new BehaviorSubject<Recipe>(null);

  private recipes: Recipe[] = [];

  // This will be store the id of the recipes that have been
  // locally deleted.
  private toBeDeleted: string[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  /**
   * Get all the recipes from the backend
   * and store a local copy.
   */
  public fetchAll(): Observable<Recipe[]> {
    return this.http
      .get(URL_DATA + 'recipes.json')
      .pipe(
        map((res: { [key: string]: Recipe }) => {
          if (null === res) {
            return [];
          } else {
            return Object.keys(res).map((key: string) => {
              return Recipe.fromRaw({ ...res[key], id: key });
            });
          }
        }),
        tap((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
        })
      );
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
    ingredients: Ingredient[]
  ): Observable<string> {
    return this.http
      .post(URL_DATA + 'recipes.json', {
        name: name,
        description: description,
        imagePath: imagePath,
        ingredients: ingredients,
      })
      .pipe(
        map((res: { name: string }) => res.name),
        tap((newId: string) => {
          const recipe = new Recipe(
            newId,
            name,
            description,
            imagePath,
            ingredients
          );
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
    const idx = this.recipes.findIndex((r) => r.id === recipe.id);
    let result: Observable<boolean> = null;

    if (-1 === idx) {
      result = of(false);
    } else {
      const endpoint = URL_DATA + `recipes/${recipe.id}.json`;
      result = this.http
        .patch(endpoint, {
          name: recipe.name,
          description: recipe.description,
          imagePath: recipe.imagePath,
          ingredients: recipe.ingredients,
        })
        .pipe(
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
    const idx = this.recipes.findIndex((r) => id === r.id);
    let result: boolean = false;

    if (-1 !== idx) {
      this.toBeDeleted.push(this.recipes[idx].id);
      this.recipes.splice(idx, 1);
      this.recipesChanged.next(this.recipes.slice());
      result = true;
    }

    return result;
  }

  // Store the local recipe list on the server.
  public saveAll(): void {
    let recipesObj: {
      [id: string]: { name; description; imagePath; ingredients };
    } = {};
    this.recipes.map((r: Recipe) => {
      recipesObj[r.id] = {
        name: r.name,
        description: r.description,
        imagePath: r.imagePath,
        ingredients: r.ingredients,
      };
    });

    const updateRecipes: Observable<boolean> = this.http
      .patch(URL_DATA + 'recipes.json', { ...recipesObj })
      .pipe(map(() => true));

    const deleteRecipes: Observable<boolean>[] = this.toBeDeleted.map(
      (id: string) =>
        this.http.delete(URL_DATA + `recipes/${id}.json`).pipe(map(() => true))
    );

    forkJoin([updateRecipes].concat(deleteRecipes)).subscribe({
      complete: () => (this.toBeDeleted = []),
    });
  }
}
