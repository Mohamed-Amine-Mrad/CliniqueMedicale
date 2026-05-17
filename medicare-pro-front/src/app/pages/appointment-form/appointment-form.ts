import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Appointment, AppointmentModel } from '../../services/appointment';

import { Patient, PatientModel } from '../../services/patient';

import { Doctor, DoctorModel } from '../../services/doctor';

import { Notification } from '../../services/notification';

@Component({
  selector: 'app-appointment-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm implements OnInit {
  patients = signal<PatientModel[]>([]);

  doctors = signal<DoctorModel[]>([]);

  appointment = {
    dateRendezVous: '',

    motif: '',

    statut: 'CONFIRMED',

    patientId: 0,

    medecinId: 0,
  };

  errorMessage = signal('');

  constructor(
    private appointmentService: Appointment,
    private patientService: Patient,
    private doctorService: Doctor,
    private router: Router,
    private notificationService: Notification,
  ) {}

  ngOnInit(): void {
    this.loadPatients();

    this.loadDoctors();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients.set(data);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  saveAppointment(): void {
    this.errorMessage.set('');

    const selectedPatient = this.patients().find((p) => p.id === this.appointment.patientId);

    const selectedDoctor = this.doctors().find((d) => d.id === this.appointment.medecinId);

    if (!selectedPatient || !selectedDoctor) {
      this.errorMessage.set('Please select a patient and a doctor.');
      return;
    }

    const appointmentData: AppointmentModel = {
      dateRendezVous: this.appointment.dateRendezVous + ':00',

      motif: this.appointment.motif,

      statut: this.appointment.statut,

      patientId: selectedPatient.id!,

      patientNom: selectedPatient.nom,

      medecinId: selectedDoctor.id!,

      medecinNom: selectedDoctor.nom,

      medecinSpecialite: selectedDoctor.specialite,
    };

    this.appointmentService.addAppointment(appointmentData).subscribe({
      next: () => {
        this.notificationService.showToast('New appointment created successfully.');

        this.router.navigate(['/appointments']);
      },

      error: (err) => {
        console.error(err);

        this.errorMessage.set('Appointment date must be today or in the future.');
      },
    });
  }
}
