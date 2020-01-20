import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showSideNav: boolean = false;
  public user: User;
  public isLoggedIn: boolean;

  public recipes: Recipe[];
  private searchTerms = new Subject<string>();
  private term: string;
  
  constructor(
    private authService: AuthenticationService,
    private recipeService: RecipeService
  ) {  }
  
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.checkToken();

    this.recipeService.recipes$.subscribe(recipes => this.recipes = recipes);
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.term = term)
    ).subscribe(() => this.recipeService.searchRecipe(this.term));
  }
  
  public sideNavChange(): void {
    this.showSideNav = !this.showSideNav;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
