<?php
session_start();
?>
<html>
	<head>
		<title>Buy Bye Checkout</title>
		<link rel="icon" type="image/png" href="/imgs/favicon.ico">
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<script src="https://kit.fontawesome.com/a215ff507f.js" crossorigin="anonymous"></script>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link href="css/dashboard.css" rel="stylesheet">
                <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>
		<link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css?t=<?php echo time();?>" type='text/css' rel='stylesheet'>
                <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

		<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/css/mdb.min.css" rel="stylesheet">
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/js/mdb.min.js"></script>

		<script src="../js/main.js?t=<?php echo time(); ?>"></script>
		<script src="../js/dashboard-ui.js?t=<?php echo time(); ?>"></script>
		<script src="../js/dashboard-methods.js?t=<?php echo time(); ?>"></script>
		<script>
			$(document).ready(function() {
				initUI();
			});
		</script>
	</head>
	<body>
		<div id='root'></div>
	</body>
</html>
