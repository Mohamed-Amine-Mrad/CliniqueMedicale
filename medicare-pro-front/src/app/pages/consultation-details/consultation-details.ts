import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  Consultation,
  ConsultationModel
} from '../../services/consultation';

@Component({
  selector: 'app-consultation-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './consultation-details.html',
  styleUrl: './consultation-details.css',
})
export class ConsultationDetails implements OnInit {

  consultation =
    signal<ConsultationModel | null>(null);

  constructor(
    private route: ActivatedRoute,
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
}