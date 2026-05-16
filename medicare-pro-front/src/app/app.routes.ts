import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Patients } from './pages/patients/patients';
import { Doctors } from './pages/doctors/doctors';
import { Appointments } from './pages/appointments/appointments';
import { Consultations } from './pages/consultations/consultations';
import { Invoices } from './pages/invoices/invoices';
import { Notifications } from './pages/notifications/notifications';
import { PatientForm } from './pages/patient-form/patient-form';
import { PatientDetails } from './pages/patient-details/patient-details';
import { PatientEdit } from './pages/patient-edit/patient-edit';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'patients', component: Patients },
  { path: 'doctors', component: Doctors },
  { path: 'appointments', component: Appointments },
  { path: 'consultations', component: Consultations },
  { path: 'invoices', component: Invoices },
  { path: 'notifications', component: Notifications },
  { path: 'patients/add', component: PatientForm },
  { path: 'patients/details/:id', component: PatientDetails },
  { path: 'patients/edit/:id', component: PatientEdit },
];