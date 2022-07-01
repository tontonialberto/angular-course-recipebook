import { Injectable } from '@angular/core';
import { Ingredient } from '../_models/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private idCounter = 4; // Used as an "auto-increment" id generator

  private ingredients: Ingredient[] = [
    new Ingredient(0, 'Carrots', '1kg'),
    new Ingredient(1, 'Tomatoes', '1kg'),
    new Ingredient(2, 'Onions', '2'),
    new Ingredient(3, 'Nutella'),
    new Ingredient(4, 'Frozen chicken', '2 bags'),
  ];

  constructor() { }

  public getAll(): Ingredient[] {
    return this.ingredients;
  }

  public getById(id: number): Ingredient | null {
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
    }

    return removed;
  }

  public add(name: string, quantity: string): void {
    const newId = ++this.idCounter;
    this.ingredients.push(new Ingredient(newId, name, quantity));
  }

  public update(id: number, name: string, quantity: string): boolean {
    const ingr = this.ingredients.find(ingredient => id === ingredient.id);
    let updated = false;

    if(null !== ingr) {
      ingr.name = name;
      ingr.quantity = quantity;
      updated = true;
    }

    return updated;
  }
}
