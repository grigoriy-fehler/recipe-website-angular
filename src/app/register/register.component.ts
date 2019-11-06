import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public error: string = '';

  public user = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.error = '';
    if(this.user.username && this.user.email && this.user.password) {
      this.authService.register(this.user)
        .then(() => this.router.navigateByUrl(this.historyService.getPreviousUrl(['/register', '/login'])))
        .then(() => window.location.reload())
        .catch((err => this.error = err));
    } else {
      this.error = 'All fields are required';
    }
  }
}
