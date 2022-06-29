import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../_models/Ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {

  @Input('ingredientId')
  id: number;

  @Input('ingredientName')
  name: string = '';

  @Input('ingredientQuantity')
  quantity: string = '';

  @Output('completed')
  completedEvent = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateClick(): void {
    this.completedEvent.emit(new Ingredient(this.id, this.name, this.quantity));
  }
}
