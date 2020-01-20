import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../recipe';
import { User } from '../user';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  @Input() reviews: Review;
  @Input() recipeId: string;
  @Input() user: User;
  @Input() isLoggedIn: string;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() { }

  public checkUser(review: Review): boolean {
    return this.isLoggedIn && this.user.username == review.author;
  }

  public onUpdate(review: Review, reviewId: string): void {
    this.reviewService.updateReview(review, this.recipeId, reviewId);
  }

  public onDelete(reviewId: string): void {
    this.reviewService.deleteReview(this.recipeId, reviewId);
  }
}
