import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { AppDataService } from '../app-data.service';
import { AuthenticationService } from '../authentication.service';

import { Recipe } from '../recipe';
import { User } from '../user';

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
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.recipeId = params.get('id');
          return this.appDataService.getRecipeById(this.recipeId);
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
      
    this.user = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.checkToken();
  }

  public onDelete(): void {
    this.appDataService.deleteRecipe(this.recipeId)
      .then(() => this.router.navigateByUrl('/'));
  }
}
