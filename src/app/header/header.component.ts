import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showSideNav: boolean = false;
  public user: User;
  public isLoggedIn: boolean;
  
  constructor(private authService: AuthenticationService) { }
  
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.checkToken();
  }
  
  public sideNavChange(): void {
    this.showSideNav = !this.showSideNav;
  }
}
