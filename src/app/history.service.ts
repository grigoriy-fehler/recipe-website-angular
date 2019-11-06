import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.history = [...this.history, event.urlAfterRedirects])
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(exclude?: Array<string>): string {
    const filtered = this.history.filter(url => !exclude.includes(url));
    return filtered[filtered.length - 1] || '/';
  }
}
