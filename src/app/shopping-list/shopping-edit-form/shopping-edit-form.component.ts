import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShoppingIngredient } from 'src/app/_models/shopping-ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

const MESSAGE_UPDATE: string = 'Update Ingredient';

const MESSAGE_CREATE: string = 'Add Ingredient';

@Component({
  selector: 'app-shopping-edit-form',
  templateUrl: './shopping-edit-form.component.html'
})
export class ShoppingEditFormComponent implements OnInit, AfterViewInit {

  // If false, mode is "create new ingredient"
  editMode: boolean = false;

  // Used as input.
  ingredient: ShoppingIngredient = null;

  private ingredientSelected = new BehaviorSubject<void>(void(0));

  actionMessage: string = null;

  @ViewChild('formEdit', { static: true }) form: NgForm;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editMode = this.route.snapshot.data['editMode'];
    this.ingredient = this.route.snapshot.data['ingredient'];
    this.ingredientSelected.next();
    this.route.data.subscribe(
      (data: Data) => {
        this.editMode = data['editMode'];
        this.setActionMessage(this.editMode);
        this.ingredient = data['ingredient'];
        this.ingredientSelected.next();
      }
    );
  }

  ngAfterViewInit(): void {
    this.ingredientSelected.subscribe(
      () => {
        setTimeout(() => this.fillFormWithIngredient(), 0);
      }
    )
  }

  onSubmit(form: NgForm): void {
    const newName: string = form.value.ingredientName;
    const newQty: string = form.value.ingredientQuantity;

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

  setActionMessage(edit: boolean): void {
    if (edit) {
      this.actionMessage = MESSAGE_UPDATE;
    }
    else {
      this.actionMessage = MESSAGE_CREATE;
    }
  }

  // Used to fill form controls with existing ingredient data.
  fillFormWithIngredient(): void {
    console.log(this.form);
    this.form.reset({
      ingredientName: this.ingredient?.name,
      ingredientQuantity: this.ingredient?.quantity
    });
  }

  onClear(): void {
    this.form.reset();
  }
}
