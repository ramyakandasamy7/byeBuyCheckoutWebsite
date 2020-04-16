'use strict';

module.exports = function(app) {
  var inventory = require('../controllers/inventoryApiControllers');

  // Inventory Routes
  app.route('/inventory')
    .get(inventory.get_all_inventory);

  app.route('/inventory/:storeId')
    .get(inventory.get_all_inventory_from_store)
    .put(inventory.update_an_inventory)
    .delete(inventory.delete_an_inventory);
  
};
