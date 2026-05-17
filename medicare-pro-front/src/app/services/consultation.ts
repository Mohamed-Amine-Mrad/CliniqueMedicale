import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConsultationModel {
  id?: number;
  dateConsultation?: string;
  diagnostic: string;
  ordonnance: string;
  prix: number;

  rendezVousId: number;
  patientNom?: string;
  medecinNom?: string;
  dateRendezVous?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Consultation {

  private apiUrl =
    'http://localhost:8081/api/consultations';

  constructor(private http: HttpClient) {}

  getConsultations():
    Observable<ConsultationModel[]> {

    return this.http.get<ConsultationModel[]>(
      this.apiUrl
    );
  }

  getConsultationById(
    id: number
  ): Observable<ConsultationModel> {

    return this.http.get<ConsultationModel>(
      `${this.apiUrl}/${id}`
    );
  }

  addConsultation(
    consultation: ConsultationModel
  ): Observable<ConsultationModel> {

    return this.http.post<ConsultationModel>(
      this.apiUrl,
      consultation
    );
  }

  updateConsultation(
    id: number,
    consultation: ConsultationModel
  ): Observable<ConsultationModel> {

    return this.http.put<ConsultationModel>(
      `${this.apiUrl}/${id}`,
      consultation
    );
  }

  deleteConsultation(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}