
function getAllInventoryFromStore() {
	$.ajax({
		url: MANAGER_API+"inventories/"+storeId,
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		renderInventoryTable(data);
	});	
}

function getAllStores() {
	$.ajax({
		url: MANAGER_API+"stores",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data);
		renderStoresTable(data);
	});
}

function updateInventoryTable(data) {
        window.inventoryTable.destroy();
        renderInventoryTable(data);
}
