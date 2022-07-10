import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './_directives/dropdown.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { ShoppingEditFormComponent } from './shopping-list/shopping-edit-form/shopping-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeDetailComponent,
    DropdownDirective,
    ErrorPageComponent,
    RecipeEditComponent,
    ShoppingEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
