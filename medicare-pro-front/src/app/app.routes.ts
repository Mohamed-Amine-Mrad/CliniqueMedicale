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
import { DoctorForm } from './pages/doctor-form/doctor-form';
import { DoctorDetails } from './pages/doctor-details/doctor-details';
import { DoctorEdit } from './pages/doctor-edit/doctor-edit';
import { AppointmentForm } from './pages/appointment-form/appointment-form';
import { AppointmentDetails } from './pages/appointment-details/appointment-details';
import { AppointmentEdit } from './pages/appointment-edit/appointment-edit';
import { ConsultationForm } from './pages/consultation-form/consultation-form';
import { ConsultationDetails } from './pages/consultation-details/consultation-details';
import { ConsultationEdit } from './pages/consultation-edit/consultation-edit';
import { InvoiceDetails } from './pages/invoice-details/invoice-details';
import { InvoiceEdit } from './pages/invoice-edit/invoice-edit';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'patients', component: Patients, canActivate: [authGuard] },
  { path: 'doctors', component: Doctors, canActivate: [authGuard] },
  { path: 'appointments', component: Appointments, canActivate: [authGuard] },
  { path: 'consultations', component: Consultations, canActivate: [authGuard] },
  { path: 'invoices', component: Invoices, canActivate: [authGuard] },
  { path: 'notifications', component: Notifications, canActivate: [authGuard] },
  { path: 'patients/add', component: PatientForm, canActivate: [authGuard] },
  { path: 'patients/details/:id', component: PatientDetails, canActivate: [authGuard] },
  { path: 'patients/edit/:id', component: PatientEdit, canActivate: [authGuard] },
  { path: 'doctors/add', component: DoctorForm, canActivate: [authGuard] },
  { path: 'doctors/details/:id', component: DoctorDetails, canActivate: [authGuard] },
  { path: 'doctors/edit/:id', component: DoctorEdit, canActivate: [authGuard] },
  { path: 'appointments/add', component: AppointmentForm, canActivate: [authGuard] },
  { path: 'appointments/details/:id', component: AppointmentDetails, canActivate: [authGuard] },
  { path: 'appointments/edit/:id', component: AppointmentEdit, canActivate: [authGuard] },
  { path: 'consultations/add', component: ConsultationForm, canActivate: [authGuard] },
  { path: 'consultations/details/:id', component: ConsultationDetails, canActivate: [authGuard] },
  { path: 'consultations/edit/:id', component: ConsultationEdit, canActivate: [authGuard] },
  { path: 'invoices/details/:id', component: InvoiceDetails, canActivate: [authGuard]},
  { path: 'invoices/edit/:id', component: InvoiceEdit, canActivate: [authGuard] },
  { path: 'login', component: Login },
];