'use strict';
module.exports = function(app) {
    var managers       = require('./managersController');
    var auth           = require('./managerAuth.js');
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
	.get(inventory.getAllInventories)
	.post(inventory.addAnInventory)
	.put(inventory.updateAnInventory)
	.delete(inventory.deleteAnInventory);

    app.route("/inventories/:storeId")
	.get(inventory.getAllInventoryFromStore);

    app.route("/inventory/:id")
	.get(inventory.getAnInventory);

    app.route("/stores")
	.get(stores.getAllStores)
	.post(stores.addAStore)
	.put(stores.updateAStore)
	.delete(stores.deleteAStore);

    app.route("/store/:storeId")
	.get(stores.getAStore);

    app.route("/auth")
	.post(auth.login);
}

