<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Add Patient</title>
</head>
<body>

<h1>Add Patient</h1>

<form action="/patient/save" method="post">

    <label>Name:</label>
    <input type="text" name="nom">
    <br><br>

    <label>Medical File:</label>
    <input type="text" name="dossierMedical">
    <br><br>

    <label>Date of Birth:</label>
    <input type="date" name="dateNaissance">
    <br><br>

    <label>Phone:</label>
    <input type="text" name="tel">
    <br><br>

    <button type="submit">Save</button>

</form>

</body>
</html>