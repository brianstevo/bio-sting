module.exports = () => {
    return `
    <!DOCTYPE html>
<html>
<head>
	<title>Contact Form</title>
</head>
<body>
	<form method="POST" align="center" action="/sendEmail">
		<span>Name: </span>
		<input type="name" name="Name">
		<br><br>

		<span>Email ID:</span>
		<input type="email" name="emailId">
		<br><br>

		<span>Phone: </span>
		<input type="phone" name="Phone">
		<br><br>

		<span>Subject: </span>
		<input type="text" name="Subject">
		<br><br>

		<textarea name="body" rows="4" cols="50"></textarea>

		<button>Send Mail</button>
	</form>
</body>
</html>
    `;
};