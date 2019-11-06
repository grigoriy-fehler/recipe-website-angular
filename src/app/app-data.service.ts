import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Recipe, Review } from './recipe';
import { User } from './user';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public appToken: string = 'app-token';

  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Recipes
  public getRecipes(): Promise<Recipe[]> {
    const url: string = `${this.apiBaseUrl}/recipes`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res as Recipe[])
      .catch(this.handleError);
  }

  public getRecipeById(recipeId: string): Promise<Recipe> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res as Recipe)
      .catch(this.handleError);
  }

  public addRecipe(formData: any, author: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/recipes`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    }
    formData.author = author;
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(res => res as Recipe)
      .catch(this.handleError);
  }

  public deleteRecipe(recipeId: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    }
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .catch(this.handleError);
  }

  // Reviews
  public addReview(recipeId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(res => res as Review)
      .catch(this.handleError);
  }

  public updateReview(formData: Review, recipeId: string, reviewId: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/review/${reviewId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    };
    return this.http
      .put(url, formData, httpOptions)
      .toPromise()
      .then(res => res as Review)
      .catch(this.handleError)
  }

  public deleteReview(recipeId: string, reviewId: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/review/${reviewId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(res => res as Review)
      .catch(this.handleError);
  }

  // Authentication
  public makeAuthApiCall(urlPath: string, user: User): Promise<any> {
    const url: string = `${this.apiBaseUrl}/user/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(res => res as string)
      .catch(this.handleError);
  }

  public deleteUser(user: User): Promise<any> {
    const url: string = `${this.apiBaseUrl}/user/delete/${user.email}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .catch(this.handleError);
  }

  // Error handling
  private handleError(err: any): Promise<any> {
    console.error(`Something has gone wrong: ${err}`);
    return Promise.reject(err.message || err);
  }
}
