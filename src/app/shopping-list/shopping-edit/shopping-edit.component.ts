import { AfterContentChecked, AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { ShoppingIngredient } from '../../_models/shopping-ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  
  ingredient: ShoppingIngredient = null;

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe(
      (ingredient: ShoppingIngredient) => {
        this.ingredient = { ...ingredient };
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateClick(): void {
    if(null !== this.ingredient) {
      const id = this.ingredient.id;
      const name = this.ingredient.name;
      const quantity = this.ingredient.quantity;
      this.shoppingListService.update(id, name, quantity);
    }
  }

  isIngredientSelected(): boolean {
    return null !== this.ingredient;
  }
}
