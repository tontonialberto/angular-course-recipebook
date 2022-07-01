import { AfterContentChecked, AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { Ingredient } from '../../_models/Ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent {

  private _id: number = -1;

  @Input() set id(_id: number) {
    this._id = _id;
    const ingredient = this.shoppingListService.getById(_id);

    if(null !== ingredient) {

      // Create a copy of the object
      this.ingredient = { ...ingredient };
    }
  }

  get id(): number { return this._id; }
  
  ingredient: Ingredient = null;

  constructor(private shoppingListService: ShoppingListService) { }

  onUpdateClick(): void {
    if(null !== this.ingredient && null !== this.shoppingListService.getById(this.id)) {
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
