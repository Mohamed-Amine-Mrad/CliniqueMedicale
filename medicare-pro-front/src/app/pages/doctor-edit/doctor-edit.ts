import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Doctor, DoctorModel } from '../../services/doctor';

@Component({
  selector: 'app-doctor-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctor-edit.html',
  styleUrl: './doctor-edit.css',
})
export class DoctorEdit implements OnInit {

  doctor = signal<DoctorModel>({
    id: 0,
    nom: '',
    specialite: '',
    disponibilite: true
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: Doctor
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.doctorService.getDoctorById(id).subscribe({

      next: (data) => {

        this.doctor.set(data);
      },

      error: (err) => {

        console.error(err);
      }
    });
  }

  updateField(field: keyof DoctorModel, value: any): void {

    this.doctor.update(d => ({
      ...d,
      [field]: value
    }));
  }

  updateDoctor(): void {

    const d = this.doctor();

    if (d.id) {

      this.doctorService
        .updateDoctor(d.id, d)
        .subscribe({

          next: () => {

            this.router.navigate(['/doctors']);
          },

          error: (err) => {

            console.error(err);
          }
        });
    }
  }
}