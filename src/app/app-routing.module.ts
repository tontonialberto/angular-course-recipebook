import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ShoppingEditFormComponent } from './shopping-list/shopping-edit-form/shopping-edit-form.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolver } from './_services/recipe-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/shopping-list', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent, children: [
    { path: '', component: ShoppingEditFormComponent, data: { editMode: false } },
    { path: 'edit/:id', component: ShoppingEditFormComponent, data: { editMode: true } }
  ] },
  { path: 'recipes', component: RecipeListComponent, children: [
    { path: '', component: ErrorPageComponent, data: { message: 'Please select a recipe!' }},
    { path: 'new', component: RecipeEditComponent },
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
