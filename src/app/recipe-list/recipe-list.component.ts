import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipes$.subscribe(recipes => this.recipes = recipes);
    this.recipeService.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
