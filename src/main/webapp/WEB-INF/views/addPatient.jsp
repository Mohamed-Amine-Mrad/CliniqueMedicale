<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>MediCare Pro - Add Patient</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

<div class="sidebar">

    <div>
        <div class="logo-box">
            <div class="logo-icon">⌁</div>
            <div>
                <h1 class="logo-title">MediCare Pro</h1>
                <p class="logo-subtitle">Clinic Management</p>
            </div>
        </div>

        <div class="menu">
            <a href="/">▦ Dashboard</a>
            <a class="active" href="/patients">👥 Patients</a>
            <a href="/medecins">🩺 Doctors</a>
            <a href="/rendezvous">📅 Appointments</a>
            <a href="/consultations">📋 Consultations</a>
            <a href="/factures">📄 Invoices</a>
            <a href="/notifications">🔔 Notifications</a>
        </div>
    </div>

    <div class="sidebar-footer">
        <div class="avatar">DR</div>
        <div>
            <p class="admin-name">Dr. Admin</p>
            <p class="admin-role">Administrator</p>
        </div>
    </div>

</div>

<div class="main">

    <div class="page-header">
        <div>
            <h1 class="page-title">Add New Patient</h1>
            <p class="page-subtitle">Create a new patient medical record</p>
        </div>

        <a class="btn btn-light" href="/patients">← Back to Patients</a>
    </div>

    <div class="form-card modern-form">

        <form action="/patient/save" method="post">

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" name="nom" placeholder="Enter patient full name" required>
            </div>

            <div class="form-group">
                <label>Medical Record</label>
                <input type="text" name="dossierMedical" placeholder="Example: MR-2026-001" required>
            </div>

            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dateNaissance">
            </div>

            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" name="tel" placeholder="Example: 22123456">
            </div>

            <div class="form-actions">
                <button class="btn" type="submit">Save Patient</button>
                <a class="btn btn-light" href="/patients">Cancel</a>
            </div>

        </form>

    </div>

</div>

</body>
</html>