<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.RendezVous" %>

<html>
<head>
    <title>Appointments List</title>
</head>
<body>

<h1>Appointments List</h1>

<a href="/rendezvous/add">
    Add Appointment
</a>

<br><br>

<table border="1">

    <tr>
        <th>ID</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Date</th>
		<th>Reason</th>
        <th>Status</th>
    </tr>

    <%
        List<RendezVous> rendezvous =
                (List<RendezVous>) request.getAttribute("rendezvous");

        if (rendezvous != null) {

            for (RendezVous r : rendezvous) {
    %>

    <tr>

        <td><%= r.getId() %></td>

        <td><%= r.getPatient().getNom() %></td>

        <td><%= r.getMedecin().getNom() %></td>

        <td><%= r.getDateRendezVous() %></td>
		
		<td><%= r.getMotif() %></td>

        <td><%= r.getStatut() %></td>

    </tr>

    <%
            }
        }
    %>

</table>

</body>
</html>