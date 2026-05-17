import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentModel {
  id?: number;
  dateRendezVous: string;
  motif: string;
  statut: string;

  patientId: number;
  patientNom: string;

  medecinId: number;
  medecinNom: string;
  medecinSpecialite: string;
}

@Injectable({
  providedIn: 'root',
})
export class Appointment {

  private apiUrl = 'http://localhost:8081/api/rendezvous';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<AppointmentModel> {
    return this.http.get<AppointmentModel>(`${this.apiUrl}/${id}`);
  }

  getAvailableAppointmentsForConsultation(): Observable<AppointmentModel[]> {
  return this.http.get<AppointmentModel[]>(
    `${this.apiUrl}/available-for-consultation`
  );
}

  addAppointment(
    appointment: AppointmentModel
  ): Observable<AppointmentModel> {

    return this.http.post<AppointmentModel>(
      this.apiUrl,
      appointment
    );
  }

  updateAppointment(
    id: number,
    appointment: AppointmentModel
  ): Observable<AppointmentModel> {

    return this.http.put<AppointmentModel>(
      `${this.apiUrl}/${id}`,
      appointment
    );
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}