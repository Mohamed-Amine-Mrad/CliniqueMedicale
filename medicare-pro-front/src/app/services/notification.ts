import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationModel {
  id?: number;
  message: string;
  dateEnvoi: string;
}

@Injectable({
  providedIn: 'root',
})
export class Notification {

  private apiUrl = 'http://localhost:8081/api/notifications';

  toastMessage = signal('');

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.apiUrl);
  }

  showToast(message: string): void {
    this.toastMessage.set(message);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 3500);
  }
}