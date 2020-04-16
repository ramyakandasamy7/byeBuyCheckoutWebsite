
function getAllInventory() {
	$.ajax({
		url: INVENTORY_API+"inventory/"+storeId,
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.Items);
		renderInventoryTable(data.Items);
	});	
}

function updateInventoryTable(data) {
        window.inventoryTable.destroy();
        renderInventoryTable(data);
}
