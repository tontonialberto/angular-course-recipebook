import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../_models/Ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  newIngredientName: string = '';

  newIngredientQuantity: string = '';

  editingIngredient: Ingredient = null;

  idEditingIngredient: number = -1;

  // Auto-increment ingredient id generator 
  lastIngredientId = 4;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAll();

    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onIngredientClick(ingredient: Ingredient): void {
    // Remove from the array the clicked ingredient.
    this.shoppingListService.remove(ingredient.id);
  }

  onAddIngredientClick(): void {
    this.shoppingListService.add(this.newIngredientName, this.newIngredientQuantity);
    this.newIngredientName = '';
    this.newIngredientQuantity = '';
  }

  onEditIngredientClick(ingredient: Ingredient): void {
    this.idEditingIngredient = ingredient.id;
  }

  onIngredientUpdated(updatedIngredient: Ingredient): void {
    this.shoppingListService.update(
      updatedIngredient.id, 
      updatedIngredient.name, 
      updatedIngredient.quantity);
  }
}
