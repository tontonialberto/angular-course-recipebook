import { AfterContentChecked, AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Ingredient } from '../../_models/Ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, AfterViewChecked {

  @Input() ingredient: Ingredient = null;

  @Output('completed')
  completedEvent = new EventEmitter<Ingredient>();

  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef;

  @ViewChild('quantityInput', { static: false })
  quantityInputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  // Populate form value with received input data
  ngAfterViewChecked(): void {
    if(null !== this.ingredient) {
      const nameInput = this.nameInputRef.nativeElement as HTMLInputElement;
      nameInput.value = this.ingredient.name;
      
      const quantityInput = this.quantityInputRef.nativeElement as HTMLInputElement;
      quantityInput.value = this.ingredient.quantity;
    }
  }

  onUpdateClick(): void {
    if(null !== this.ingredient) {
      const id = this.ingredient.id;
      const name = (this.nameInputRef.nativeElement as HTMLInputElement).value;
      const quantity = (this.quantityInputRef.nativeElement as HTMLInputElement).value;
      this.completedEvent.emit(new Ingredient(id, name, quantity));
    }
  }

  isIngredientSelected(): boolean {
    return null !== this.ingredient;
  }
}
