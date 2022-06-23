import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Carrots', '1kg'),
    new Ingredient('Tomatoes', '1kg'),
    new Ingredient('Onions', '2'),
    new Ingredient('Nutella'),
    new Ingredient('Frozen chicken', '2 bags'),
  ];

  newIngredientName: string = '';

  newIngredientQuantity: string = '';

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
    this.ingredients.push(new Ingredient(this.newIngredientName, this.newIngredientQuantity));
    this.newIngredientName = '';
    this.newIngredientQuantity = '';
  }
}
