
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
	renderModal();
	getAllInventoryFromStore();
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
					+"<h3>Store "+storeId+"'s Inventory</h3>"
					+"<button type='button' class='btn btn-primary btn-sm mb-5' data-toggle='modal' data-target='#inventory_modal' onclick='showAddItem();'>Add A New Item</button>"
					+"<table class='table table-striped table-sm' id='inventory_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='stores_content'>"
					+"<h3>List of Stores</h3>"
					+"<button type='button' class='btn btn-primary btn-sm mb-5' data-toggle='modal' data-target='#inventory_modal' onclick='showAddStore();'>Add A Store Location</button>"
					+"<table class='table table-striped table-sm' id='stores_table'></table>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderInventoryTable() {
	let data = window.ITEMS;
	
	console.log("InventoryTable");
	console.log(data);
	window.inventoryTable = $("#inventory_table").DataTable({
		"pageLength": 50,
		"autoWidth": false,
		"data": data,
		"columns": [
			{ "title": "Name",         "data": "name"     },
			{ "title": "Price",        "data": "price"    },
			{ "title": "Quantity",     "data": "quantity" },
			{ "title": "Barcode",      "data": "barcode"  },
			{ "title": "Last Updated", "data": "updatedAt"},
			{ "title": "Options",      "data": "options"  },
		]
	}); 
}

function renderStoresTable(data) {
	console.log("StoresTable");
	console.log(data);
	window.inventoryTable = $("#stores_table").DataTable({
		"pageLength": 50,
		"autoWidth": false,
		"data":data,
		"columns": [
			{ "title": "Name",     "data": "name"    },
			{ "title": "Address",  "data": "address" }
		]
	}); 
}

function renderModal() {
	$("#root").append(
		"<div class='modal fade' id='inventory_modal' tabindex='-1' role='dialog' aria-labelledby='Inventory Modal' aria-hidden='true'>"
			+"<div class='modal-dialog' role='document'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h5 class='modal-title' id='modal_header'></h5>"
						+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
							+"<span aria-hidden='true'>&times</span>"
						+"</button>"
					+"</div>"
					+"<div class='modal-body' id='modal_body'>"
					+"</div>"
					+"<div class='modal-footer' id='modal_footer'>"
						+"<button type='button' class='btn btn-primary btn-sm' onclick='addLocation();'>Add</button>"
						+"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Close</button>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function clearModalBody() {
	$("#modal_body").empty();
	$("#modal_footer").empty();
}

function addModalHeader(txt) {
	$("#modal_header").empty();
	$("#modal_header").append(txt);
}

function showAddItem() {
	clearModalBody();
	addModalHeader("Add an item");
	$("#modal_body").append(
		"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Product Name</span>"
                        +"</div>"
                        +"<input type='text' id='new_name' class='form-control' value='Gatorade Frost'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Barcode</span>"
                        +"</div>"
                        +"<input type='text' id='new_barcode' class='form-control' value='854236001191'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Quantity</span>"
                        +"</div>"
                        +"<input type='number' id='new_quantity' class='form-control' value='400'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Price [$]</span>"
                        +"</div>"
                        +"<input type='number' id='new_price' class='form-control' value='2.50'>"
                +"</div>"
		+"<button type='button' class='btn btn-primary btn-sm' onclick='addItemToDB();'>Add Item</button>"
	);

}

function showEditItem(id) {
	console.log(id);
	clearModalBody();
	addModalHeader("Edit this item");
	let item = window.ITEMS.find(x => x.id === id);
	console.log(item);
	$("#modal_body").append(
		"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Product Name</span>"
                        +"</div>"
                        +`<input type='text' id='edit_name' class='form-control' value='${item.name}'>`
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Barcode</span>"
                        +"</div>"
                        +`<input type='text' id='edit_barcode' class='form-control' value='${item.barcode}'>`
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Quantity</span>"
                        +"</div>"
                        +`<input type='number' id='edit_quantity' class='form-control' value='${item.quantity}'>`
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Price [$]</span>"
                        +"</div>"
                        +`<input type='number' id='edit_price' class='form-control' value='${item.price}'>`
                +"</div>"
		+"<button type='button' class='btn btn-primary btn-sm' onclick='sendEdit(\""+id+"\");'>Save Changes</button>"
	);

}

