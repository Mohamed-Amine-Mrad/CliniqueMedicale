<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Facture" %>

<html>
<head>
    <title>Invoices List</title>
</head>
<body>

<h1>Invoices List</h1>

<table border="1">

    <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Amount</th>
        <th>Payment Status</th>
    </tr>

    <%
        List<Facture> factures =
                (List<Facture>) request.getAttribute("factures");

        if (factures != null) {

            for (Facture f : factures) {
    %>

    <tr>

        <td><%= f.getId() %></td>

        <td><%= f.getDateFacture() %></td>

        <td>
            <%= f.getConsultation()
                    .getRendezVous()
                    .getPatient()
                    .getNom() %>
        </td>

        <td>
            Dr.
            <%= f.getConsultation()
                    .getRendezVous()
                    .getMedecin()
                    .getNom() %>
        </td>

        <td><%= f.getMontant() %> DT</td>

        <td><%= f.getStatutPaiement() %></td>

    </tr>

    <%
            }
        }
    %>

</table>

</body>
</html>