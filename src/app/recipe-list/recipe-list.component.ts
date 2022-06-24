import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(0, 'Carbonara Spaghetti', 'A very good dish.'),
    new Recipe(1, 'Margherita Pizza', 'The best pizza evah.')
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
