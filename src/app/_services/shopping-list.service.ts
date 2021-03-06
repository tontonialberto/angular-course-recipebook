import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // Emits when a method such as update, remove... gets called
  public ingredientsChanged = new Subject<ShoppingIngredient[]>();

  // Emitted from the outside of the service
  public ingredientSelected = new BehaviorSubject<ShoppingIngredient>(null);

  private idCounter = 4; // Used as an "auto-increment" id generator

  private ingredients: ShoppingIngredient[] = [
    new ShoppingIngredient(0, 'Carrots [kg]', 1),
    new ShoppingIngredient(1, 'Tomatoes [kg]', 1),
    new ShoppingIngredient(2, 'Onions', 2),
    new ShoppingIngredient(3, 'Nutella', null),
    new ShoppingIngredient(4, 'Frozen chicken [bags]', 2),
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

  public add(name: string, quantity: number): void {
    const newId = ++this.idCounter;
    this.ingredients.push(new ShoppingIngredient(newId, name, quantity));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public update(id: number, name: string, quantity: number): boolean {
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
