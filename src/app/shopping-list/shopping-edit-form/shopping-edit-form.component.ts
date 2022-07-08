import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/_models/ingredient.model';
import { ShoppingIngredient } from 'src/app/_models/shopping-ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

const MESSAGE_UPDATE: string = 'Update Ingredient';

const MESSAGE_CREATE: string = 'Add Ingredient';

@Component({
  selector: 'app-shopping-edit-form',
  templateUrl: './shopping-edit-form.component.html'
})
export class ShoppingEditFormComponent implements OnInit {

  // If false, mode is "create new ingredient"
  editMode: boolean = false;

  // Used as input.
  ingredient: ShoppingIngredient = null;

  actionMessage: string = null;

  @ViewChild('formEdit') form: NgForm;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editMode = this.route.snapshot.data['editMode'];
    this.setIngredientOrRedirect(this.route.snapshot.params);
    this.route.data.subscribe(
      (data: Data) => {
        this.editMode = data['editMode']
        this.setActionMessage(this.editMode);
      }
    );

  }

  ngAfterViewInit(): void {
    // setTimeout() is used to wait next tick in order to have a correctly initialized NgForm.
    setTimeout(() => {
      this.route.params.subscribe((params: Params) => {
        if (this.editMode) {
          this.setIngredientOrRedirect(params);
          this.initFormInEditMode();
        }
      });
    }, 0)
  }

  onSubmit(form: NgForm): void {
    const newName: string = form.value.ingredientName;
    const newQty: string = form.value.ingredientQuantity;

    if (this.editMode) {
      const id = this.ingredient.id;
      this.shoppingListService.update(id, newName, newQty);
    }
    else {
      this.shoppingListService.add(newName, newQty);
      form.reset({
        ingredientName: '',
        ingredientQuantity: 1
      });
    }
  }
  
  setIngredientOrRedirect(params: Params): void {
    this.ingredient = this.shoppingListService.getById(+params['id']);

    if (null === this.ingredient) {
      this.router.navigate(['/shopping-list']);
    }
  }

  setActionMessage(edit: boolean): void {
    if (this.editMode) {
      this.actionMessage = MESSAGE_UPDATE;
    }
    else {
      this.actionMessage = MESSAGE_CREATE;
    }
  }

  // Used to fill form controls with existing ingredient data.
  initFormInEditMode(): void {
    this.form.reset({
      ingredientName: this.ingredient?.name,
      ingredientQuantity: this.ingredient?.quantity
    });
  }
}
