<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Medecin" %>

<html>
<head>
    <title>Doctors List</title>
</head>
<body>

<h1>Doctors List</h1>

<a href="/medecin/add">Add Doctor</a>

<br><br>

<table border="1">

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Speciality</th>
        <th>Availability</th>
    </tr>

    <%
        List<Medecin> medecins = (List<Medecin>) request.getAttribute("medecins");

        if (medecins != null) {

            for (Medecin m : medecins) {
    %>

    <tr>
        <td><%= m.getId() %></td>
        <td><%= m.getNom() %></td>
        <td><%= m.getSpecialite() %></td>
        <td><%= m.getDisponibilite() %></td>
    </tr>

    <%
            }
        }
    %>

</table>

</body>
</html>