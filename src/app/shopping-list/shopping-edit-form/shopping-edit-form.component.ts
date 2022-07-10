import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingIngredient } from 'src/app/_models/shopping-ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

const MESSAGE_UPDATE: string = 'Update Ingredient';

const MESSAGE_CREATE: string = 'Add Ingredient';

@Component({
  selector: 'app-shopping-edit-form',
  templateUrl: './shopping-edit-form.component.html'
})
export class ShoppingEditFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // Used as input.
  ingredient: ShoppingIngredient = null;

  // If false, mode is "create new ingredient"
  private editMode: boolean = false;

  private subIngredientSelected: Subscription;

  @ViewChild('formEdit', { static: true }) form: NgForm;

  constructor(
    private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editMode = this.route.snapshot.data['editMode'];

    this.route.data.subscribe(
      (data: Data) => {
        this.editMode = data['editMode'];
      }
    );

    this.subIngredientSelected = this.shoppingListService.ingredientSelected.subscribe(
      (ingredient: ShoppingIngredient) => {
        if (this.editMode) {
          this.ingredient = ingredient;
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.shoppingListService.ingredientSelected.subscribe(
      () => {
        setTimeout(() => this.fillFormWithIngredient(), 0);
      }
    )
  }

  ngOnDestroy(): void {
    this.subIngredientSelected.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const newName: string = form.value.ingredientName;
    const newQty: number = +form.value.ingredientQuantity;

    if (this.editMode) {
      const id = this.ingredient.id;
      this.shoppingListService.update(id, newName, newQty);
      this.router.navigate(['/shopping-list']);
    }
    else {
      this.shoppingListService.add(newName, newQty);
      form.reset({
        ingredientName: '',
        ingredientQuantity: 1
      });
    }
  }

  getActionMessage(): string {
    if (this.editMode) {
      return MESSAGE_UPDATE;
    }
    else {
      return MESSAGE_CREATE;
    }
  }

  // Used to fill form controls with existing ingredient data.
  private fillFormWithIngredient(): void {
    this.form.reset({
      ingredientName: this.ingredient?.name,
      ingredientQuantity: this.ingredient?.quantity
    });
  }

  onClear(): void {
    this.form.reset();
  }
}
