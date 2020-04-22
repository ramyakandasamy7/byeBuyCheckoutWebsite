'use strict';
module.exports = function(app) {
    var managers       = require('./managersController');
    var inventory      = require('./inventoryController');
    var stores         = require('./storesController');
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');

    var express = require('express');

    app.use(bodyParser.json());
    app.use(methodOverride('_method'));

    app.route("/managers")
        .get(managers.getAllManagers)
	.post(managers.authenticateAManager);

    app.route("/inventories")
	.get(inventory.getAllInventories);

    app.route("/inventories/:storeId")
	.get(inventory.getAllInventoryFromStore);

    app.route("/inventory/:itemId")
	.get(inventory.getAnInventory);

    app.route("/stores")
	.get(stores.getAllStores)
	.post(stores.addAStore)
	.put(stores.updateAStore)
	.delete(stores.deleteAStore);

    app.route("/store/:storeId")
	.get(stores.getAStore);
}

