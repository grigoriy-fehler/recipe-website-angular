import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../app-data.service';

import { Recipe } from '../recipe';
// import { RECIPE } from '../mock-recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  selectedRecipe: Recipe;

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.getRecipes()
  }

  private getRecipes(): void {
    this.appDataService
      .getRecipes()
      .then(foundRecipes => this.recipes = foundRecipes);
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
