
function login() {
	let u = $('#user').val();
	let p = $('#password').val();

	console.log(u);
	console.log(p);
	$.ajax({
		url: MANAGER_API+"auth",
		type: 'POST',
		data: {name: u, password: p}
	}).done(function(data, stat, statCode) {
		console.log(data);
		console.log(statCode);
		if (statCode.status == 200) {
			getUserInfo();
		} 
	});
}

function getUserInfo() {
	let u = $('#user').val();
        let p = $('#password').val();

        console.log(u);
        console.log(p);
        $.ajax({
                url: MANAGER_API+"managers",
                type: 'POST',
                data: {email: u, password: p}
        }).done(function(data, stat, statCode) {
        	setUserInfo(data.email, data.name, data.id, data.storeId);
        	location.replace('https://bbc.ramyasmsseproject.com/dashboard');
        });
}

