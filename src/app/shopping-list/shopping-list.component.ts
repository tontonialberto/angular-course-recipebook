import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient(0, 'Carrots', '1kg'),
    new Ingredient(1, 'Tomatoes', '1kg'),
    new Ingredient(2, 'Onions', '2'),
    new Ingredient(3, 'Nutella'),
    new Ingredient(4, 'Frozen chicken', '2 bags'),
  ];

  newIngredientName: string = '';

  newIngredientQuantity: string = '';

  editingIngredient: Ingredient = new Ingredient(-1, '', '');

  lastIngredientId = 4;

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientClick(ingredient: Ingredient): void {
    // Remove from the array the clicked ingredient.
    this.ingredients = this.ingredients.filter((element => {
      return (element.name !== ingredient.name) || (element.quantity !== ingredient.quantity);
    }));
  }

  onAddIngredientClick(): void {
    const id = ++this.lastIngredientId;
    this.ingredients.push(new Ingredient(id, this.newIngredientName, this.newIngredientQuantity));
    this.newIngredientName = '';
    this.newIngredientQuantity = '';
  }

  onEditIngredientClick(ingredient: Ingredient): void {
    this.editingIngredient = ingredient;
  }

  onIngredientUpdated(updatedIngredient: Ingredient): void {
    const idx = this.ingredients.findIndex(ingredient => ingredient.id === updatedIngredient.id);

    if(idx !== -1)
      this.ingredients[idx] = updatedIngredient;
  }
}
