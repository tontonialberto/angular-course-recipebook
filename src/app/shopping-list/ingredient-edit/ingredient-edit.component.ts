import { AfterContentChecked, AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { Ingredient } from '../../_models/Ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent {
  
  ingredient: Ingredient = null;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.ingredientSelected.subscribe(
      (ingredient: Ingredient) => {
        this.ingredient = { ...ingredient };
      }
    );
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
