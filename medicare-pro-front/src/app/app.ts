import { Component, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { Toast } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Toast
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title =
    signal('medicare-pro-front');

  isLoginPage = false;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.isLoginPage =
          event.url.includes('/login');
      }
    });
  }

  logout(): void {

    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);
  }
}