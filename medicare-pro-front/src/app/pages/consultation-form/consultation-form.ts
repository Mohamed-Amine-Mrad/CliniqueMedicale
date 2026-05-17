import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Consultation } from '../../services/consultation';
import { Appointment, AppointmentModel } from '../../services/appointment';
import { Notification } from '../../services/notification';

@Component({
  selector: 'app-consultation-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './consultation-form.html',
  styleUrl: './consultation-form.css',
})
export class ConsultationForm implements OnInit {
  appointments = signal<AppointmentModel[]>([]);
  errorMessage = signal('');

  consultation = {
    rendezVousId: 0,
    diagnostic: '',
    ordonnance: '',
    prix: 0,
  };

  constructor(
    private consultationService: Consultation,
    private appointmentService: Appointment,
    private router: Router,
    private notificationService: Notification,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAvailableAppointmentsForConsultation().subscribe({
      next: (data) => {
        this.appointments.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  saveConsultation(): void {
    this.errorMessage.set('');

    this.consultationService.addConsultation(this.consultation as any).subscribe({
      next: (response: any) => {
        if (response.success === false) {
          this.errorMessage.set(response.message);
          return;
        }

        this.notificationService.showToast('Consultation added successfully.');

        this.router.navigate(['/consultations']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Unable to save consultation.');
      },
    });
  }
}
