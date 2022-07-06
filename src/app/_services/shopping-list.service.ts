import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredientsChanged = new Subject<ShoppingIngredient[]>();

  public ingredientSelected = new Subject<ShoppingIngredient>();

  private idCounter = 4; // Used as an "auto-increment" id generator

  private ingredients: ShoppingIngredient[] = [
    new ShoppingIngredient(0, 'Carrots', '1kg'),
    new ShoppingIngredient(1, 'Tomatoes', '1kg'),
    new ShoppingIngredient(2, 'Onions', '2'),
    new ShoppingIngredient(3, 'Nutella', null),
    new ShoppingIngredient(4, 'Frozen chicken', '2 bags'),
  ];

  constructor() { }

  public getAll(): ShoppingIngredient[] {
    return this.ingredients.slice();
  }

  public getById(id: number): ShoppingIngredient | null {
    const ingredient = this.ingredients.find(ingredient => id === ingredient.id);
    let result = null;

    if(undefined !== ingredient) {
      result = ingredient;
    }

    return result;
  }

  public remove(id: number): boolean {
    const idx = this.ingredients.findIndex(ingredient => id === ingredient.id);
    let removed = false;
    
    if(-1 !== idx) {
      this.ingredients.splice(idx, 1);
      removed = true;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    return removed;
  }

  public add(name: string, quantity: string): void {
    const newId = ++this.idCounter;
    this.ingredients.push(new ShoppingIngredient(newId, name, quantity));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public update(id: number, name: string, quantity: string): boolean {
    const ingr = this.ingredients.find(ingredient => id === ingredient.id);
    let updated = false;

    if(undefined !== ingr) {
      ingr.name = name;
      ingr.quantity = quantity;
      updated = true;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    return updated;
  }
}
