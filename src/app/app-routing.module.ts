import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolver } from './_services/recipe-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/shopping-list', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipes', component: RecipeListComponent, children: [
    { path: '', component: ErrorPageComponent, data: { message: 'Please select a recipe!' }},
    { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
    { path: ':id/edit', component: RecipeEditComponent }
  ] },
  { path: '**', component: ErrorPageComponent, data: { message: 'Oops.. this page does not exist!' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
