import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Doctor, DoctorModel } from '../../services/doctor';

@Component({
  selector: 'app-doctor-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.css',
})
export class DoctorForm {

  doctor: DoctorModel = {
    nom: '',
    specialite: '',
    disponibilite: true
  };

  constructor(
    private doctorService: Doctor,
    private router: Router
  ) {}

  saveDoctor(): void {

    this.doctorService.addDoctor(this.doctor).subscribe({

      next: () => {

        this.router.navigate(['/doctors']);
      },

      error: (err) => {

        console.error(err);
      }
    });
  }
}