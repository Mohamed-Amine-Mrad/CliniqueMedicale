import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DoctorModel {
  id?: number;
  nom: string;
  specialite: string;
  disponibilite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Doctor {

  private apiUrl = 'http://localhost:8081/api/medecins';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(this.apiUrl);
  }

  getDoctorById(id: number): Observable<DoctorModel> {
    return this.http.get<DoctorModel>(`${this.apiUrl}/${id}`);
  }

  addDoctor(doctor: DoctorModel): Observable<DoctorModel> {
    return this.http.post<DoctorModel>(this.apiUrl, doctor);
  }

  updateDoctor(id: number, doctor: DoctorModel): Observable<DoctorModel> {
    return this.http.put<DoctorModel>(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}