<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Patient" %>
<%@ page import="tn.spring.clinique.entites.Medecin" %>

<html>
<head>
    <title>Add Appointment</title>
</head>
<body>

<h1>Add Appointment</h1>

<%
    String error = (String) request.getAttribute("error");

    if (error != null) {
%>

<h3 style="color:red;">
    <%= error %>
</h3>

<%
    }
%>

<form action="/rendezvous/save" method="post">

    <label>Patient:</label>

    <select name="patientId">

        <%
            List<Patient> patients = (List<Patient>) request.getAttribute("patients");

            for (Patient p : patients) {
        %>

        <option value="<%= p.getId() %>">
            <%= p.getNom() %>
        </option>

        <%
            }
        %>

    </select>

    <br><br>

    <label>Doctor:</label>

    <select name="medecinId">

        <%
            List<Medecin> medecins = (List<Medecin>) request.getAttribute("medecins");

            for (Medecin m : medecins) {
        %>

        <option value="<%= m.getId() %>">
            <%= m.getNom() %> - <%= m.getSpecialite() %>
        </option>

        <%
            }
        %>

    </select>

    <br><br>

    <label>Date and Time:</label>

    <input type="datetime-local" name="dateRendezVous">

    <br><br>

    <button type="submit">
        Save
    </button>

</form>

</body>
</html>