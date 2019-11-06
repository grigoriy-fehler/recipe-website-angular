import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() showSideNav = new EventEmitter<boolean>();

  public user: User;
  public isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.checkToken();
  }

  onClose() {
    this.showSideNav.emit();
  }
}
