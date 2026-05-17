import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Doctor, DoctorModel } from '../../services/doctor';

@Component({
  selector: 'app-doctor-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css',
})
export class DoctorDetails implements OnInit {

  doctor = signal<DoctorModel | null>(null);

  constructor(
    private route: ActivatedRoute,
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
}