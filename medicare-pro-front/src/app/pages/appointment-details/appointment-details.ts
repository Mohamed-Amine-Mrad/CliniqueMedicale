import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Appointment, AppointmentModel } from '../../services/appointment';

@Component({
  selector: 'app-appointment-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-details.html',
  styleUrl: './appointment-details.css',
})
export class AppointmentDetails implements OnInit {

  appointment = signal<AppointmentModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    private appointmentService: Appointment
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.appointmentService.getAppointmentById(id).subscribe({

      next: (data) => {

        this.appointment.set(data);
      },

      error: (err) => {

        console.error(err);
      }
    });
  }
}