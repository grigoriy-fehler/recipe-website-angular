import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Review } from './recipe';
import { AppDataService } from './app-data.service';
import { HistoryService } from './history.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private appDataService: AppDataService,
    private historyService: HistoryService,
    private location: Location,
    private router: Router
  ) { }

  public addReview(recipeId: string, formData: Review): void {
    this.appDataService.addReview(recipeId, formData).subscribe(() => this.reload());
  }

  public updateReview(formData: Review, recipeId: string, reviewId: string): void {
    this.appDataService.updateReview(formData, recipeId, reviewId).subscribe();
  }

  public deleteReview(recipeId: string, reviewId: string): void {
    this.appDataService.deleteReview(recipeId, reviewId).subscribe(() => this.reload());
  }

  private reload(): void {
    const path = this.location.path();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
    }); 
  }
}
