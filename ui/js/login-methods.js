
function login() {
	let u = $('#user').val();
	let p = $('#password').val();

	console.log(u);
	console.log(p);
	$.ajax({
		url: MANAGER_API+"managers",
		type: 'POST',
		data: {email: u, password: p}
	}).done(function(data) {
		console.log(data);
		setUserInfo(data.email, data.name, data.id, data.storeId);
		location.replace('https://bbc.ramyasmsseproject.com/dashboard');
	});
}

