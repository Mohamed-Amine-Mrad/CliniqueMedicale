import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InvoiceModel {
  id?: number;
  dateFacture: string;
  montant: number;
  statutPaiement: string;
  consultationId?: number;
  patientNom?: string;
  medecinNom?: string;
  diagnostic?: string;
  ordonnance?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Invoice {
  private apiUrl = 'http://localhost:8081/api/factures';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceModel[]> {
    return this.http.get<InvoiceModel[]>(this.apiUrl);
  }

  getInvoiceById(id: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(`${this.apiUrl}/${id}`);
  }

  markAsPaid(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/pay`, {});
  }

  updateInvoice(id: number, invoice: InvoiceModel): Observable<InvoiceModel> {
    return this.http.put<InvoiceModel>(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
