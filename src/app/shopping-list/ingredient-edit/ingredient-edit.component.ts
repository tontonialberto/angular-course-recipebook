import { AfterContentChecked, AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { Ingredient } from '../../_models/Ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() id: number = -1;
  
  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef;
  
  @ViewChild('quantityInput', { static: false })
  quantityInputRef: ElementRef;
  
  ingredient: Ingredient = null;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.ingredient = this.shoppingListService.getById(this.id);
  }

  // Populate form value with input ingredient's data
  ngAfterViewChecked(): void {
    if(null !== this.ingredient) {
      const nameInput = this.nameInputRef.nativeElement as HTMLInputElement;
      nameInput.value = this.ingredient.name;
      
      const quantityInput = this.quantityInputRef.nativeElement as HTMLInputElement;
      quantityInput.value = this.ingredient.quantity;
    }
  }

  onUpdateClick(): void {
    if(null !== this.ingredient && null !== this.shoppingListService.getById(this.id)) {
      const id = this.ingredient.id;
      const name = (this.nameInputRef.nativeElement as HTMLInputElement).value;
      const quantity = (this.quantityInputRef.nativeElement as HTMLInputElement).value;
      this.shoppingListService.update(id, name, quantity);
    }
  }

  isIngredientSelected(): boolean {
    return null !== this.ingredient;
  }
}
