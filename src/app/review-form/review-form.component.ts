import { Component, OnInit, Input } from '@angular/core';

import { AppDataService } from '../app-data.service';
import { AuthenticationService } from '../authentication.service';

import { User } from '../user';
import { Review } from '../recipe';

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
    private appDataService: AppDataService,
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
      this.appDataService.addReview(this.recipeId, this.newReview)
        .then(review => {
          this.initializeForm();
          window.location.reload()
        })
        .catch(err => this.error = err)
    } else {
      this.error = 'All fields are required';
    }
  }

  public getUsername(): string {
    return this.authService.getCurrentUser().username;
  }
}