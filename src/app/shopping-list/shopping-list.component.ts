import { Component, OnInit } from '@angular/core';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: ShoppingIngredient[] = [];

  newIngredientName: string = '';

  newIngredientQuantity: string = '';

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAll();

    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: ShoppingIngredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onIngredientClick(ingredient: ShoppingIngredient): void {
    // Remove from the array the clicked ingredient.
    this.shoppingListService.remove(ingredient.id);
  }

  onAddIngredientClick(): void {
    this.shoppingListService.add(this.newIngredientName, this.newIngredientQuantity);
    this.newIngredientName = '';
    this.newIngredientQuantity = '';
  }

  onEditIngredientClick(ingredient: ShoppingIngredient): void {
    this.shoppingListService.ingredientSelected.emit(ingredient);
  }
}
