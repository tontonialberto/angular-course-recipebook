import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  // If false, we are in "new recipe" mode.
  editMode: boolean = false;

  recipe: Recipe = null;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']) {
          this.editMode = true;
          this.recipe = this.recipeService.getById(+params['id']);
        }
        else {
          this.editMode = false;
        }
      }
    )

    this.form = new FormGroup({
      'name': new FormControl(this.recipe?.name, [Validators.required]),
      'description': new FormControl(this.recipe?.description),
      'ingredients': new FormArray(
        this.recipe ? 
          this.recipe.ingredients.map(i => new FormGroup({
            'name': new FormControl(i.name, Validators.required),
            'quantity': new FormControl(i.quantity, [Validators.required, Validators.pattern('\\d*')])
          }))
          : []
      )
    });
  }

  onSubmit(): void {
    console.log(this.form);
  }

  onAddIngredient(): void {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'quantity': new FormControl(1, [Validators.required, Validators.pattern('\\d*')])
      })
    );
  }

  onDeleteIngredient(idx: number): void {
    (this.form.get('ingredients') as FormArray).removeAt(idx);
  }
}
