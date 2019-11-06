import { Injectable } from '@angular/core';
import { User } from './user';
import { AppDataService } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private appToken: string = this.appDataService.appToken;

  constructor(private appDataService: AppDataService) { }

  // check if logged in
  public checkToken(): boolean {
    const token: string = localStorage.getItem(this.appToken);
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > [Date.now() / 1000];
    } else {
      return false;
    }
  }

  public register(user: User): Promise<any> {
    return this.appDataService.makeAuthApiCall('register', user)
      .then((token: string) => localStorage.setItem(this.appToken, token));
  }

  public login(user: User): Promise<any> {
    return this.appDataService.makeAuthApiCall('login', user)
      .then((token: string) => localStorage.setItem(this.appToken, token));
  }

  public logout(): void {
    localStorage.removeItem(this.appToken);
  }

  public getCurrentUser(): User {
    if (this.checkToken()) {
      const token: string = localStorage.getItem(this.appToken);
      const {email, username} = JSON.parse(atob(token.split('.')[1]));
      return {email, username} as User;
    } else {
      return {email: '', username: ''} as User;
    }
  }
}
