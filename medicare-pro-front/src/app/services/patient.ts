import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PatientModel {
  id?: number;
  nom: string;
  dossierMedical: string;
  dateNaissance: string;
  tel: string;
}

@Injectable({
  providedIn: 'root',
})
export class Patient {
  private apiUrl = 'http://localhost:8081/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(this.apiUrl);
  }

  addPatient(patient: PatientModel): Observable<PatientModel> {
    return this.http.post<PatientModel>(this.apiUrl, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: number, patient: PatientModel): Observable<PatientModel> {
    return this.http.put<PatientModel>(`${this.apiUrl}/${id}`, patient);
  }

  getPatientById(id: number): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${this.apiUrl}/${id}`);
  }
}
