<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.RendezVous" %>

<html>
<head>
    <title>Add Consultation</title>
</head>
<body>

<h1>Add Consultation</h1>

<form action="/consultation/save" method="post">

    <label>Appointment:</label>
    <select name="rendezVousId">
        <%
            List<RendezVous> rendezvous =
                    (List<RendezVous>) request.getAttribute("rendezvous");

            if (rendezvous != null) {
                for (RendezVous r : rendezvous) {
        %>

        <option value="<%= r.getId() %>">
            <%= r.getPatient().getNom() %> -
            Dr. <%= r.getMedecin().getNom() %> -
            <%= r.getDateRendezVous() %>
        </option>

        <%
                }
            }
        %>
    </select>

    <br><br>

    <label>Diagnostic:</label>
    <input type="text" name="diagnostic">

    <br><br>

	<label>Ordonnance:</label>
	<input type="text" name="ordonnance">

	<br><br>

	<label>Price:</label>
	<input type="number" step="0.01" name="prix">

	<br><br>

    <button type="submit">Save</button>

</form>

</body>
</html>