import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RegisterComponent } from './register/register.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    RecipeDetailComponent,
    AboutComponent,
    ImprintComponent,
    PrivacyComponent,
    AddRecipeComponent,
    RegisterComponent,
    UsersHomeComponent,
    ReviewListComponent,
    ReviewFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
