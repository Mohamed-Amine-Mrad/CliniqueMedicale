<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Consultation" %>

<html>
<head>
    <title>Consultations List</title>
</head>
<body>

<h1>Consultations List</h1>

<a href="/consultation/add">Add Consultation</a>

<br><br>

<table border="1">

    <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Diagnostic</th>
		<th>Ordonnance</th>
		<th>Price</th>
    </tr>

    <%
        List<Consultation> consultations =
                (List<Consultation>) request.getAttribute("consultations");

        if (consultations != null) {
            for (Consultation c : consultations) {
    %>

    <tr>
        <td><%= c.getId() %></td>
        <td><%= c.getDateConsultation() %></td>
        <td><%= c.getRendezVous().getPatient().getNom() %></td>
        <td><%= c.getRendezVous().getMedecin().getNom() %></td>
        <td><%= c.getDiagnostic() %></td>
		<td><%= c.getOrdonnance() %></td>
		<td><%= c.getPrix() %></td>
    </tr>

    <%
            }
        }
    %>

</table>

</body>
</html>