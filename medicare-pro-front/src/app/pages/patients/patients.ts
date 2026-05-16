import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Patient, PatientModel } from '../../services/patient';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, RouterLink],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients implements OnInit {

  patients = signal<PatientModel[]>([]);

  showDeleteModal = signal(false);

  selectedPatientId = signal<number | null>(null);

  constructor(private patientService: Patient) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {

    this.patientService.getPatients().subscribe({

      next: (data) => {

        this.patients.set(data);
      },

      error: (err) => {

        console.error(err);
      }
    });
  }

  openDeleteModal(id: number): void {

    this.selectedPatientId.set(id);

    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {

    this.showDeleteModal.set(false);

    this.selectedPatientId.set(null);
  }

  confirmDelete(): void {

    const id = this.selectedPatientId();

    if (id != null) {

      this.patientService.deletePatient(id).subscribe({

        next: () => {

          this.closeDeleteModal();

          this.loadPatients();
        },

        error: (err) => {

          console.error(err);
        }
      });
    }
  }
}