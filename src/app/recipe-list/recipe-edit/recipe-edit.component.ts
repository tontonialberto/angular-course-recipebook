import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private router: Router) { }

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
      'imagePath': new FormControl(this.recipe?.imagePath),
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
    const { name, description, imagePath, ingredients } = this.form.value;
    
    if(this.editMode) {
      const id = this.recipe.id;
      const recipe = new Recipe(id, name, description, imagePath, ingredients);
      this.recipeService.update(recipe);
      this.router.navigate(['/recipes', id]);
    }
    else {
      this.recipeService.add(name, description, imagePath, ingredients);
    }
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
