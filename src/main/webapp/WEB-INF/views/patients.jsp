<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Patient" %>

<html>
<head>
    <title>Patients List</title>
</head>
<body>

<h1>Patients List</h1>

<a href="/patient/add">Add Patient</a>

<br><br>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Medical File</th>
        <th>Date of Birth</th>
        <th>Phone</th>
    </tr>

    <%
        List<Patient> patients = (List<Patient>) request.getAttribute("patients");

        if (patients != null) {
            for (Patient p : patients) {
    %>
        <tr>
            <td><%= p.getId() %></td>
            <td><%= p.getNom() %></td>
            <td><%= p.getDossierMedical() %></td>
            <td><%= p.getDateNaissance() %></td>
            <td><%= p.getTel() %></td>
        </tr>
    <%
            }
        }
    %>

</table>

</body>
</html>