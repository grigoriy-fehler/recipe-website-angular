import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersHomeComponent } from './users-home/users-home.component';

const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'add-recipe', component: AddRecipeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
