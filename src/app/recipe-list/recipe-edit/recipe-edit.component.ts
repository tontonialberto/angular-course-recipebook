import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  // If false, we are in "new recipe" mode.
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.id) {
          this.editMode = true;
          console.log('Edit mode');
        }
        else {
          this.editMode = false;
          console.log('Create mode');
        }
      }
    )
  }

}
