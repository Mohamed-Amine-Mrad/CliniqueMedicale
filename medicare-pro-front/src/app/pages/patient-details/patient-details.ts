import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Patient, PatientModel } from '../../services/patient';

@Component({
  selector: 'app-patient-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails implements OnInit {

  patient = signal<PatientModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    private patientService: Patient
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.patientService.getPatients().subscribe({

      next: (data) => {

        const foundPatient =
          data.find(p => p.id === id) || null;

        this.patient.set(foundPatient);
      },

      error: (err) => {

        console.error(err);
      }
    });
  }
}