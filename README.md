# MediCare Pro - Clinic Management System

MediCare Pro is a full-stack clinic management application developed with Spring Boot, Angular, MySQL, Docker and Docker Compose.

The system allows the administrator to manage patients, doctors, appointments, consultations, invoices and notifications from a modern dashboard.

## Features

### Authentication
- Fixed admin login
- Protected routes
- Logout functionality
- Sidebar hidden on login page

### Patients Management
- Add patient
- View patient details
- Edit patient
- Delete patient
- Search patients

### Doctors Management
- Add doctor
- View doctor details
- Edit doctor
- Delete doctor
- Search doctors

### Appointments Management
- Add appointment
- View appointment details
- Edit appointment
- Delete appointment
- Search appointments
- Validation for past dates
- Validation for doctor availability

### Consultations Management
- Add consultation linked to an appointment
- View consultation details
- Edit consultation
- Delete consultation
- Search consultations
- Only appointments without consultation appear in consultation form

### Invoices Management
- Automatic invoice generation after consultation
- View invoice details with printable design
- Edit invoice
- Delete invoice
- Mark invoice as paid
- Search invoices

### Notifications
- Notification page
- Search notifications
- Toast notification popup after important actions

### Dashboard
- Total patients
- Total doctors
- Total appointments
- Total consultations
- Total revenue
- Recent appointments

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Swagger OpenAPI

### Frontend
- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Signals

### DevOps
- Docker
- Docker Compose
- Nginx

## Project Structure

```text
CliniqueMedicale/
│
├── src/                    # Spring Boot backend source code
├── medicare-pro-front/     # Angular frontend source code
├── Dockerfile              # Backend Dockerfile
├── docker-compose.yml      # Docker Compose configuration
└── README.md
