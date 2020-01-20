import { Injectable } from '@angular/core';
import { AppDataService } from './app-data.service';
import { Subject } from 'rxjs';
import { Recipe } from './recipe';
import { Router } from '@angular/router';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesSource = new Subject<Recipe[]>();
  private recipeSource = new Subject<Recipe>();

  public recipes$ = this.recipesSource.asObservable();
  public recipe$ = this.recipeSource.asObservable();

  constructor(
    private appDataService: AppDataService,
    private historyService: HistoryService,
    private router: Router
  ) { }

  public changeRecipes(recipes): void {
    this.recipesSource.next(recipes);
  }

  public changeRecipe(recipe): void {
    this.recipeSource.next(recipe);
  }

  public getRecipes(): void {
    this.appDataService.getRecipes().subscribe(recipes => this.changeRecipes(recipes));
  }

  public getRecipeById(id: string): void {
    this.appDataService.getRecipeById(id).subscribe(recipe => this.changeRecipe(recipe));
  }

  public addRecipe(formData: FormData): void {
    this.appDataService.addRecipe(formData)
      .subscribe(() => this.router.navigateByUrl(this.historyService.getPreviousUrl(['/register', '/login', '/add-recipe'])));
  }

  public deleteRecipe(id: string): void {
    this.appDataService.deleteRecipe(id)
      .subscribe(() => this.router.navigateByUrl(this.historyService.getPreviousUrl(['/register', '/login'])));
  }

  public searchRecipe(term: string): void {
    this.appDataService.searchRecipe(term).subscribe(recipes => {
      this.changeRecipes(recipes);
      this.router.navigateByUrl('/');
    });
  }
}
