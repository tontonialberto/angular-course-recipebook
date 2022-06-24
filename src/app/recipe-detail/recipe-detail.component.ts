import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../_models/Recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input('recipeName')
  name: string = '';

  @Input('recipeDescription')
  description: string = '';

  @Input('recipeImagePath')
  imagePath: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
