import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './_shared/spinner/spinner.component';
import { AuthInterceptor } from './_services/auth-interceptor.service';

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
    ShoppingEditFormComponent,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
