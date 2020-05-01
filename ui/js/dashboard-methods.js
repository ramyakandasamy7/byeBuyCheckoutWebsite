
var ITEMS = null;

function getAllInventoryFromStore() {
	$.ajax({
		url: MANAGER_API+"inventories/"+storeId,
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		window.ITEMS = null;
		window.ITEMS = data;
		for (i = 0; i < window.ITEMS.length; i++) {
			let id = window.ITEMS[i].id;
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='showEditItem(\""+id+"\");' data-toggle='modal' data-target='#inventory_modal' title='Edit Item Info'><i class='fas fa-edit fa-lg'></i></a>";
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteItem(\""+id+"\");' title='Delete Item'><i class='fas fa-trash fa-lg'></i></a>";
			window.ITEMS[i].options = editbtn + delbtn;
		}
		renderInventoryTable();
	});	
}

function getAllStores() {
	$.ajax({
		url: MANAGER_API+"stores",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		renderStoresTable();
	});
}

function updateInventoryTable() {
        window.inventoryTable.destroy();
        getAllInventoryFromStore();
}

function addItemToDB() {
	let name  = $("#new_name").val();
	let barcd = $("#new_barcode").val();
	let qty   = $("#new_quantity").val();
	let price = $("#new_price").val();

	$.ajax({
		url: MANAGER_API+"inventories",
		type: "POST",
		data: { name: name, barcode: barcd, quantity: qty, price: price, storeId: window.storeId}
	}).done(function(data, stat, statCode) {
		console.log(data);
		if (statCode.status === 200) {
			updateInventoryTable();
		} else {
			alert("Error adding item to inventory!");
		}
	});

}

function sendEdit(id) {
	let name  = $("#edit_name").val();
	let barcd = $("#edit_barcode").val();
	let qty   = $("#edit_quantity").val();
	let price = $("#edit_price").val();

	$.ajax({
		url: MANAGER_API+"inventories",
		type: "PUT",
		data: {
			id: id,
			name: name,
			barcode: barcd,
			quantity: qty,
			price: price
		}
	}).done(function(data, stat, statCode) {
		console.log(data);
		if (statCode.status === 200) {
			updateInventoryTable();
		} else {
			alert("Error sending edit to database!");
		}
	});

}

function deleteItem(id) {
	let confirmDelete = confirm("Are you really sure you want to remove this item from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"inventories",
                        type: "DELETE",
                        data: { id: id}
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
			if (statCode.status === 200) {
				updateInventoryTable();
			} else {
				alert("Error removing item from database!");
			}
                });
        }
}
