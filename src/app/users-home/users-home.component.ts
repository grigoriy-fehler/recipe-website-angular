import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  public user: User;

  constructor(
    private appDataService: AppDataService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/')
      .then(() => window.location.reload());
  }

  public onDelete(): void {
    this.appDataService.deleteUser(this.user);
    this.onLogout();
  }
}
