import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Doctor, DoctorModel } from '../../services/doctor';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  doctors = signal<DoctorModel[]>([]);
  showDeleteModal = signal(false);
  selectedDoctorId = signal<number | null>(null);
  searchText = signal('');

  constructor(private doctorService: Doctor) {}

  ngOnInit(): void {
    this.loadDoctors();
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
  openDeleteModal(id: number): void {
    this.selectedDoctorId.set(id);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedDoctorId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedDoctorId();

    if (id != null) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadDoctors();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  filteredDoctors(): DoctorModel[] {
    const search = this.searchText().toLowerCase();

    return this.doctors().filter(
      (doctor) =>
        doctor.nom.toLowerCase().includes(search) ||
        doctor.specialite.toLowerCase().includes(search),
    );
  }
}
