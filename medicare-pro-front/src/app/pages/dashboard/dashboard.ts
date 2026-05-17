import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Patient } from '../../services/patient';
import { Doctor } from '../../services/doctor';
import { Appointment, AppointmentModel } from '../../services/appointment';
import { Consultation } from '../../services/consultation';
import { Invoice, InvoiceModel } from '../../services/invoice';
import { Notification } from '../../services/notification';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalPatients = signal(0);
  totalDoctors = signal(0);
  totalAppointments = signal(0);
  totalConsultations = signal(0);
  totalRevenue = signal(0);
  totalNotifications = signal(0);

  recentAppointments = signal<AppointmentModel[]>([]);
  recentInvoices = signal<InvoiceModel[]>([]);

  constructor(
    private patientService: Patient,
    private doctorService: Doctor,
    private appointmentService: Appointment,
    private consultationService: Consultation,
    private invoiceService: Invoice,
    private notificationService: Notification
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {

    this.patientService.getPatients().subscribe(data => {
      this.totalPatients.set(data.length);
    });

    this.doctorService.getDoctors().subscribe(data => {
      this.totalDoctors.set(data.length);
    });

    this.appointmentService.getAppointments().subscribe(data => {
      this.totalAppointments.set(data.length);
      this.recentAppointments.set(data.slice(-5).reverse());
    });

    this.consultationService.getConsultations().subscribe(data => {
      this.totalConsultations.set(data.length);
    });

    this.invoiceService.getInvoices().subscribe(data => {
      this.recentInvoices.set(data.slice(-5).reverse());

      const revenue = data.reduce((sum, invoice) => {
        return sum + Number(invoice.montant);
      }, 0);

      this.totalRevenue.set(revenue);
    });

    this.notificationService.getNotifications().subscribe(data => {
      this.totalNotifications.set(data.length);
    });
  }
}