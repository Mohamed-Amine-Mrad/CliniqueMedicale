<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.RendezVous" %>

<html>
<head>
    <title>MediCare Pro</title>
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
            <a class="active" href="/">▦ Dashboard</a>
            <a href="/patients">👥 Patients</a>
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

    <h1 class="page-title">Dashboard</h1>
    <p class="page-subtitle">Welcome back! Here's what's happening today.</p>

    <div class="stats-grid">

        <div class="stat-card">
            <div class="stat-top">
                <div class="stat-icon blue">👥</div>
                <div class="stat-growth">Patients</div>
            </div>
            <div class="stat-label">Total Patients</div>
            <div class="stat-value"><%= request.getAttribute("totalPatients") %></div>
        </div>

        <div class="stat-card">
            <div class="stat-top">
                <div class="stat-icon teal">🩺</div>
                <div class="stat-growth">Doctors</div>
            </div>
            <div class="stat-label">Total Doctors</div>
            <div class="stat-value"><%= request.getAttribute("totalDoctors") %></div>
        </div>

        <div class="stat-card">
            <div class="stat-top">
                <div class="stat-icon cyan">📅</div>
                <div class="stat-growth">Appointments</div>
            </div>
            <div class="stat-label">Total Appointments</div>
            <div class="stat-value"><%= request.getAttribute("totalAppointments") %></div>
        </div>

        <div class="stat-card">
            <div class="stat-top">
                <div class="stat-icon green">$</div>
                <div class="stat-growth">Revenue</div>
            </div>
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value"><%= request.getAttribute("totalRevenue") %> DT</div>
        </div>

    </div>

    <div class="dashboard-grid">

        <div class="panel">
            <h2>Patient Growth</h2>
            <div class="chart-box">
                <div class="fake-line"></div>
            </div>
        </div>

        <div class="panel">
            <h2>Revenue Overview</h2>
            <div class="bar-chart">
                <div class="bar" style="height: 130px;"></div>
                <div class="bar" style="height: 160px;"></div>
                <div class="bar" style="height: 180px;"></div>
                <div class="bar" style="height: 170px;"></div>
                <div class="bar" style="height: 195px;"></div>
                <div class="bar" style="height: 220px;"></div>
            </div>
        </div>

    </div>

    <div class="panel table-panel">
        <h2>Recent Appointments</h2>

        <table>
            <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
            </tr>

            <%
                List<RendezVous> rendezvous =
                        (List<RendezVous>) request.getAttribute("rendezvous");

                if (rendezvous != null && !rendezvous.isEmpty()) {

                    for (RendezVous r : rendezvous) {
            %>

            <tr>
                <td>
                    <span class="patient-pill">
                        <%= r.getPatient().getNom().substring(0, 1).toUpperCase() %>
                    </span>
                    <%= r.getPatient().getNom() %>
                </td>

                <td>Dr. <%= r.getMedecin().getNom() %></td>

                <td><%= r.getDateRendezVous() %></td>

                <td><%= r.getMotif() %></td>

                <td>
                    <span class="badge badge-success">
                        <%= r.getStatut() %>
                    </span>
                </td>
            </tr>

            <%
                    }

                } else {
            %>

            <tr>
                <td colspan="5">No appointments found.</td>
            </tr>

            <%
                }
            %>

        </table>
    </div>

</div>

</body>
</html>