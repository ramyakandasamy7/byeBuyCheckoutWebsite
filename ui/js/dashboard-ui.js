
var userEmail = getUserEmail();
var userName  = getUserName();
var userId    = getUserId();
var storeId   = getStoreId();
var inventoryTable = "";

console.log(userEmail);
console.log(userName);
console.log(userId);
console.log(storeId);

function initUI() {
	checkIfLoggedIn();
	renderContainers();
	renderNavigationBar();
	renderContents();
	getAllInventory();
}

function renderContainers() {
	$("#root").append(
		"<nav class='navbar fixed-top navbar-dark bg-dark'>"
			+"<a class='navbar-brand' href='#'>ByeBuyCheckout Inventory Dashboard</a>"
			+"<form class='form-inline' style='margin-block-end: 0;'>" 
				+"<span class='text-white mr-4'>Hi "+userName+"</span>"
				+"<button type='button' class='btn btn-danger btn-sm' onclick='logout();'>Logout</button>"
			+"</form>" 
		+"</nav>"
		+"<div class='container-fluid'>"
			+"<div class='row flex-xl-nowrap' id='ui_container'>"
				+"<div class='col-12 col-md-2 col-xl-2 bd-sidebar' id='navigation_bar' style='border-right: 2px solid #333333; height: 100vh; padding-top: 65px;'>"
				+"</div>"
				+"<div class='col-12 col-md-10 col-xl-10 bd-content' id='main_content' style='padding-top: 65px;'>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderNavigationBar() {
	$("#navigation_bar").append(
		"<div class='container text-center'>"
			+"<h5>Navigation</h3>"
			+"<div class='container'>"
				+"<nav class='nav flex-column nav-pills'>"
					+"<a data-toggle='tab' class='nav-link active' href='#main_inventory_content'>Inventory</a>"
					+"<a data-toggle='tab' class='nav-link' href='#add_inventory_content'>Inventory Entry</a>"
				+"</nav>"
			+"</div>"
		+"</div>"
	);
}

function renderContents() {
	$("#main_content").append(
		"<div class='container-fluid'>"
			+"<div class='tab-content'>"
				+"<div class='tab-pane fade-in active' id='main_inventory_content'>"
					+"<h5>Store Inventory</h5>"
					+"<table class='table table-striped table-sm' id='inventory_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='add_inventory_content'>"
					+"<h5>Add Store Inventory</h5>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderInventoryTable(data) {
	console.log("InventoryTable");
	console.log(data);
	window.inventoryTable = $("#inventory_table").DataTable({
		"pageLength": 50,
		"data":data,
		"columns": [
			{ "title": "Name",     "data": "name"    },
			{ "title": "Price",    "data": "price"   },
			{ "title": "Quantity", "data": "quantity"}
		]
	}); 
}
