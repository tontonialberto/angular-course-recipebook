import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingIngredient } from '../_models/shopping-ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientResolver implements Resolve<ShoppingIngredient> {

  constructor(private shoppingListService: ShoppingListService, private router: Router) { }

  resolve(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot)
      : ShoppingIngredient | 
        Observable<ShoppingIngredient> | 
        Promise<ShoppingIngredient> {

    const id = +route.params['id'];
    const ingredient = this.shoppingListService.getById(id);

    // Redirect if no such ingredient.
    if(null === ingredient) {
      this.router.navigate(['/shopping-list']);
    }

    return ingredient;
  }
}
