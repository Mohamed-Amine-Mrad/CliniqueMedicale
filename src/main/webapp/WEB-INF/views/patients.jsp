<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Patient" %>

<html>
<head>
    <title>MediCare Pro - Patients</title>
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
            <h1 class="page-title">Patients Management</h1>
            <p class="page-subtitle">Manage and view all patient records</p>
        </div>

        <a class="btn" href="/patient/add">+ Add New Patient</a>
    </div>

    <div class="panel table-panel">

        <div class="search-box">
            🔍 Search patients by name, phone, or medical record...
        </div>

        <table>
            <tr>
                <th>Patient Info</th>
                <th>Contact</th>
                <th>Birth Date</th>
                <th>Medical Record</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>

            <%
                List<Patient> patients =
                        (List<Patient>) request.getAttribute("patients");

                if (patients != null && !patients.isEmpty()) {

                    for (Patient p : patients) {
            %>

            <tr>
                <td>
                    <span class="patient-pill">
                        <%= p.getNom().substring(0, 1).toUpperCase() %>
                    </span>
                    <strong><%= p.getNom() %></strong>
                </td>

                <td>📞 <%= p.getTel() %></td>

                <td>📅 <%= p.getDateNaissance() %></td>

                <td>
                    <span class="record-badge">
                        <%= p.getDossierMedical() %>
                    </span>
                </td>

                <td>
                    <span class="badge badge-success">Active</span>
                </td>

                <td>
                    <span class="action-icon">👁</span>
                    <span class="action-icon">✏️</span>
					<a class="action-icon danger"
					   href="/patient/delete/<%= p.getId() %>"
					   onclick="return confirm('Are you sure you want to delete this patient?');">
					   🗑
					</a>
                </td>
            </tr>

            <%
                    }

                } else {
            %>

            <tr>
                <td colspan="6">No patients found.</td>
            </tr>

            <%
                }
            %>

        </table>
    </div>

</div>

</body>
</html>