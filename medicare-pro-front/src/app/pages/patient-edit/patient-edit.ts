import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Patient, PatientModel } from '../../services/patient';

@Component({
  selector: 'app-patient-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-edit.html',
  styleUrl: './patient-edit.css',
})
export class PatientEdit implements OnInit {

  patient = signal<PatientModel>({
    id: 0,
    nom: '',
    dossierMedical: '',
    dateNaissance: '',
    tel: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: Patient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        this.patient.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateField(field: keyof PatientModel, value: string): void {
    this.patient.update(p => ({
      ...p,
      [field]: value
    }));
  }

  updatePatient(): void {
    const p = this.patient();

    if (p.id) {
      this.patientService.updatePatient(p.id, p).subscribe({
        next: () => {
          this.router.navigate(['/patients']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}