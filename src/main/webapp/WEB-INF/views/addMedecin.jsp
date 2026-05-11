<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Add Doctor</title>
</head>
<body>

<h1>Add Doctor</h1>

<form action="/medecin/save" method="post">

    <label>Name:</label>
    <input type="text" name="nom">
    <br><br>

    <label>Speciality:</label>
    <input type="text" name="specialite">
    <br><br>

    <label>Availability:</label>

    <select name="disponibilite">
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
    </select>

    <br><br>

    <button type="submit">Save</button>

</form>

</body>
</html>