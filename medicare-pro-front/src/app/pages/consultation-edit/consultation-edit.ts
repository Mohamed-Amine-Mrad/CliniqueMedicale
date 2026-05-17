import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  Consultation,
  ConsultationModel
} from '../../services/consultation';

@Component({
  selector: 'app-consultation-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './consultation-edit.html',
  styleUrl: './consultation-edit.css',
})
export class ConsultationEdit implements OnInit {

  consultation = signal<ConsultationModel>({
    id: 0,
    diagnostic: '',
    ordonnance: '',
    prix: 0,
    rendezVousId: 0
  });

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultationService: Consultation
  ) {}

  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.consultationService
      .getConsultationById(id)
      .subscribe({

        next: (data) => {

          this.consultation.set(data);
        },

        error: (err) => {

          console.error(err);
        }
      });
  }

  updateField(
    field: keyof ConsultationModel,
    value: any
  ): void {

    this.consultation.update(c => ({
      ...c,
      [field]: value
    }));
  }

  updateConsultation(): void {

    const c = this.consultation();

    if (c.id) {

      this.consultationService
        .updateConsultation(c.id, c)
        .subscribe({

          next: () => {

            this.router.navigate(['/consultations']);
          },

          error: (err) => {

            console.error(err);

            this.errorMessage.set(
              'Unable to update consultation.'
            );
          }
        });
    }
  }
}