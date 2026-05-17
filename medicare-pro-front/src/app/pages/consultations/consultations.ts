import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Consultation, ConsultationModel } from '../../services/consultation';

@Component({
  selector: 'app-consultations',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css',
})
export class Consultations implements OnInit {
  consultations = signal<ConsultationModel[]>([]);
  searchText = signal('');

  showDeleteModal = signal(false);

  selectedConsultationId = signal<number | null>(null);

  constructor(private consultationService: Consultation) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().subscribe({
      next: (data) => {
        this.consultations.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  filteredConsultations(): ConsultationModel[] {
    const search = this.searchText().toLowerCase();

    return this.consultations().filter(
      (c) =>
        c.diagnostic.toLowerCase().includes(search) ||
        c.ordonnance.toLowerCase().includes(search) ||
        String(c.prix).includes(search),
    );
  }

  openDeleteModal(id: number): void {
    this.selectedConsultationId.set(id);

    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);

    this.selectedConsultationId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedConsultationId();

    if (id != null) {
      this.consultationService.deleteConsultation(id).subscribe({
        next: () => {
          this.closeDeleteModal();

          this.loadConsultations();
        },

        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
