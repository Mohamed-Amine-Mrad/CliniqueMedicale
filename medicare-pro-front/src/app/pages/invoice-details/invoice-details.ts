import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  Invoice,
  InvoiceModel
} from '../../services/invoice';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.css',
})
export class InvoiceDetails implements OnInit {

  invoice = signal<InvoiceModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    private invoiceService: Invoice
  ) {}

  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.invoiceService
      .getInvoiceById(id)
      .subscribe({

        next: (data) => {

          this.invoice.set(data);
        },

        error: (err) => {

          console.error(err);
        }
      });
  }
}