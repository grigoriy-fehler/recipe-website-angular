import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Recipe, Review } from './recipe';
import { User } from './user';

import { environment } from '../environments/environment';
import { of, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public appToken: string = 'app-token';

  private apiBaseUrl: string = environment.apiBaseUrl;
  private queryUrl: string = 'search=';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.appToken)}`
    })
  }

  constructor(private http: HttpClient) { }

  // Recipes
  public getRecipes(): Observable<Recipe[]> {
    const url: string = `${this.apiBaseUrl}/recipes`;
    return this.http.get<Recipe[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getRecipeById(recipeId: string): Observable<Recipe> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}`;
    return this.http.get<Recipe>(url)
      .pipe(catchError(this.handleError));
  }

  public addRecipe(formData: FormData): Observable<any> {
    const url: string = `${this.apiBaseUrl}/recipes`;
    return this.http.post(url, formData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteRecipe(recipeId: string): Observable<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchRecipe(term: string): Observable<Recipe[]> {
    if (term == '') return this.getRecipes();
    return this.http.get<Recipe[]>(`${this.apiBaseUrl}/${this.queryUrl}${term}`)
      .pipe(catchError(this.handleError));
  }

  // Reviews
  public addReview(recipeId: string, formData: Review): Observable<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/reviews`;
    return this.http.post(url, formData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updateReview(formData: Review, recipeId: string, reviewId: string): Observable<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/review/${reviewId}`;
    return this.http.put(url, formData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteReview(recipeId: string, reviewId: string): Observable<any> {
    const url: string = `${this.apiBaseUrl}/recipe/${recipeId}/review/${reviewId}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
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
    return this.http
      .delete(url, this.httpOptions)
      .toPromise()
      .catch(this.handleError);
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
