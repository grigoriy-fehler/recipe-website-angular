import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Recipe } from '../recipe';
import { User } from '../user';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  public recipe: Recipe;
  public user: User;
  public isLoggedIn: boolean;
  private recipeId: string;

  constructor(
    private authService: AuthenticationService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeService.recipe$.subscribe(recipe => this.recipe = recipe);
    
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.getRecipe();
      
    this.user = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.checkToken();
  }

  public getRecipe(): void {
    this.recipeService.getRecipeById(this.recipeId);
  }

  public onDelete(): void {
    this.recipeService.deleteRecipe(this.recipeId);
  }
}
