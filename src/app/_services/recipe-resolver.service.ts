import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../_models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
    const id: number = +route.params['id'];
    const recipe: Recipe = this.recipeService.getById(id);
    
    // If no such recipe with that id, navigate to recipes section.
    if(null === recipe) {
      this.router.navigate(['/recipes']);
    }

    return recipe;
  }
}
