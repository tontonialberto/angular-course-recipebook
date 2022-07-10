import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../_models/ingredient.model';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: ShoppingIngredient[] = [];

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

  onEdit(ingredient: ShoppingIngredient): void {
    this.shoppingListService.ingredientSelected.next(ingredient);
  }
}
