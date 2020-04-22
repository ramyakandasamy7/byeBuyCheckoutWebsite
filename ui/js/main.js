
var MANAGER_API = "https://bbcbe.ramyasmsseproject.com/managerapi/"

function setUserInfo(email, name, id, storeId) {
	localStorage.setItem("email",  email);
	localStorage.setItem("name",   name);
	localStorage.setItem("id",     id);
	localStorage.setItem("storeId",storeId);
}

function clearUserInfo() {
	localStorage.removeItem("email");
	localStorage.removeItem("name");
	localStorage.removeItem("id");
	localStorage.removeItem("storeId");
}

function getUserEmail() {
	return localStorage.getItem('email');
}

function getUserName() {
	return localStorage.getItem('name');
}

function getUserId() {
	return localStorage.getItem('id');
}

function getStoreId() {
	return localStorage.getItem('storeId');
}

function checkIfLoggedIn() {
	if (localStorage.getItem("email") === null) {
		logout();
	}
}

function logout() {
	clearUserInfo();
	location.replace("https://bbc.ramyasmsseproject.com");
}
