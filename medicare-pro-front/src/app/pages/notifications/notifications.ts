import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Notification,
  NotificationModel
} from '../../services/notification';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {

  notifications = signal<NotificationModel[]>([]);
  searchText = signal('');

  constructor(
    private notificationService: Notification
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  filteredNotifications(): NotificationModel[] {
    const search = this.searchText().toLowerCase();

    return this.notifications().filter(notification =>
      notification.message.toLowerCase().includes(search) ||
      notification.dateEnvoi.toLowerCase().includes(search)
    );
  }
}