import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Appointment, AppointmentModel } from '../../services/appointment';

import { Patient, PatientModel } from '../../services/patient';

import { Doctor, DoctorModel } from '../../services/doctor';

@Component({
  selector: 'app-appointment-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointment-edit.html',
  styleUrl: './appointment-edit.css',
})
export class AppointmentEdit implements OnInit {
  patients = signal<PatientModel[]>([]);

  doctors = signal<DoctorModel[]>([]);

  appointment = signal({
    id: 0,

    dateRendezVous: '',

    motif: '',

    statut: 'CONFIRMED',

    patientId: 0,

    medecinId: 0,
  });

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: Appointment,
    private patientService: Patient,
    private doctorService: Doctor,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadPatients();

    this.loadDoctors();

    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data) => {
        this.appointment.set({
          id: data.id || 0,

          dateRendezVous: data.dateRendezVous,

          motif: data.motif,

          statut: data.statut,

          patientId: data.patientId,

          medecinId: data.medecinId,
        });
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients.set(data);
      },
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
      },
    });
  }

  updateField(field: string, value: any): void {
    this.appointment.update((a) => ({
      ...a,
      [field]: value,
    }));
  }

  updateAppointment(): void {
    const a = this.appointment();

    const selectedPatient = this.patients().find((p) => p.id === Number(a.patientId));

    const selectedDoctor = this.doctors().find((d) => d.id === Number(a.medecinId));

    if (!selectedPatient || !selectedDoctor) {
      return;
    }

    const appointmentData = {
      patientId: Number(a.patientId),
      medecinId: Number(a.medecinId),
      dateRendezVous: a.dateRendezVous,
      motif: a.motif,
    };

    this.appointmentService.updateAppointment(a.id, appointmentData as any).subscribe({
      next: () => {
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error(err);

        this.errorMessage.set('You cannot modify an appointment that has already passed.');
      },
    });
  }
}
