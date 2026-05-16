import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Patient, PatientModel } from '../../services/patient';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm {

  patient: PatientModel = {
    nom: '',
    dossierMedical: '',
    dateNaissance: '',
    tel: ''
  };

  constructor(
    private patientService: Patient,
    private router: Router
  ) {}

  savePatient(): void {
    this.patientService.addPatient(this.patient).subscribe({
      next: () => {
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}