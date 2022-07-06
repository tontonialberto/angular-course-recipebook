import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: ShoppingIngredient[] = [];

  newIngredientName: string = '';

  newIngredientQuantity: string = '';

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAll();

    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: ShoppingIngredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.shoppingListService.ingredientSelected.next(ingredient);
  }
}
