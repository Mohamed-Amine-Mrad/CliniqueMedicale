import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Appointment, AppointmentModel } from '../../services/appointment';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments implements OnInit {
  appointments = signal<AppointmentModel[]>([]);

  searchText = signal('');

  showDeleteModal = signal(false);

  selectedAppointmentId = signal<number | null>(null);

  errorMessage = signal('');

  constructor(private appointmentService: Appointment) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  filteredAppointments(): AppointmentModel[] {
    const search = this.searchText().toLowerCase();

    return this.appointments().filter(
      (a) =>
        a.patientNom.toLowerCase().includes(search) ||
        a.medecinNom.toLowerCase().includes(search) ||
        a.motif.toLowerCase().includes(search) ||
        a.statut.toLowerCase().includes(search),
    );
  }

  openDeleteModal(id: number): void {
    this.selectedAppointmentId.set(id);

    this.showDeleteModal.set(true);

    this.errorMessage.set('');
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);

    this.selectedAppointmentId.set(null);

    this.errorMessage.set('');
  }

  confirmDelete(): void {
    const id = this.selectedAppointmentId();

    if (id != null) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.closeDeleteModal();

          this.loadAppointments();
        },

        error: (err) => {
          this.errorMessage.set(err.error.message || 'Unable to delete appointment.');
        },
      });
    }
  }
}
