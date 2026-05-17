import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Invoice, InvoiceModel } from '../../services/invoice';
import { Notification } from '../../services/notification';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices implements OnInit {
  invoices = signal<InvoiceModel[]>([]);
  searchText = signal('');
  showDeleteModal = signal(false);
  selectedInvoiceId = signal<number | null>(null);

  constructor(
    private invoiceService: Invoice,
    private notificationService: Notification,
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  filteredInvoices(): InvoiceModel[] {
    const search = this.searchText().toLowerCase();

    return this.invoices().filter(
      (invoice) =>
        invoice.patientNom?.toLowerCase().includes(search) ||
        invoice.medecinNom?.toLowerCase().includes(search) ||
        invoice.diagnostic?.toLowerCase().includes(search) ||
        invoice.statutPaiement.toLowerCase().includes(search) ||
        String(invoice.montant).includes(search),
    );
  }

  markAsPaid(id: number): void {
    this.invoiceService.markAsPaid(id).subscribe({
      next: () => {
        this.notificationService.showToast('Invoice marked as paid.');

        this.loadInvoices();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openDeleteModal(id: number): void {
    this.selectedInvoiceId.set(id);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedInvoiceId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedInvoiceId();

    if (id != null) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadInvoices();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
