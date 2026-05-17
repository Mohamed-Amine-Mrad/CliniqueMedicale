import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Invoice, InvoiceModel } from '../../services/invoice';

@Component({
  selector: 'app-invoice-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './invoice-edit.html',
  styleUrl: './invoice-edit.css',
})
export class InvoiceEdit implements OnInit {
  invoice = signal<InvoiceModel>({
    id: 0,
    dateFacture: '',
    montant: 0,
    statutPaiement: '',
  });

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: Invoice,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.invoiceService.getInvoiceById(id).subscribe({
      next: (data) => {
        this.invoice.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateField(field: keyof InvoiceModel, value: any): void {
    this.invoice.update((i) => ({
      ...i,
      [field]: value,
    }));
  }

  updateInvoice(): void {
    const i = this.invoice();

    if (i.id) {
      this.invoiceService.updateInvoice(i.id, i).subscribe({
        next: () => {
          this.router.navigate(['/invoices']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set('Unable to update invoice.');
        },
      });
    }
  }
}
