import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

import { User } from '../user';
import { Review } from '../recipe';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  public isLoggedIn: boolean = this.authService.checkToken();

  private user: User;

  public newReview: Review;

  @Input() recipeId: string;

  public error: string;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.initializeForm();
  }

  private formValidation(): boolean {
    if (this.newReview.text && this.newReview.rating && this.newReview.author) {
      return true;
    } else {
      return false;
    }
  }

  private initializeForm(): void {
    this.newReview = {
      author: this.user.username,
      text: '',
      rating: 5
    };
  }

  public onSubmit(): void {
    this.error = '';
    this.newReview.author = this.getUsername();
    if (this.formValidation()) {
      this.reviewService.addReview(this.recipeId, this.newReview);
    } else {
      this.error = 'All fields are required';
    }
  }

  public getUsername(): string {
    return this.authService.getCurrentUser().username;
  }
}