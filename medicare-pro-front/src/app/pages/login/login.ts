import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  motDePasse = '';

  errorMessage = signal('');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(): void {
    this.errorMessage.set('');

    this.http
      .post<any>('http://localhost:8081/api/auth/login', {
        email: this.email,
        motDePasse: this.motDePasse,
      })
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('isLoggedIn', 'true');

            this.router.navigate(['/']);
          } else {
            this.errorMessage.set(response.message);
          }
        },

        error: () => {
          this.errorMessage.set('Unable to login.');
        },
      });
  }
}
