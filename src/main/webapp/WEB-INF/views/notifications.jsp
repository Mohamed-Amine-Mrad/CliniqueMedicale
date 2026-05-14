<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="tn.spring.clinique.entites.Notification" %>

<html>
<head>
    <title>Notifications</title>
</head>
<body>

<h1>Appointment Notifications</h1>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Message</th>
        <th>Date</th>
    </tr>

    <%
        List<Notification> notifications =
                (List<Notification>) request.getAttribute("notifications");

        if (notifications != null) {
            for (Notification n : notifications) {
    %>

    <tr>
        <td><%= n.getId() %></td>
        <td><%= n.getMessage() %></td>
        <td><%= n.getDateEnvoi() %></td>
    </tr>

    <%
            }
        }
    %>

</table>

</body>
</html>