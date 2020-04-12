'use strict';

module.exports = function(app) {
  var manager = require('../controllers/managerApiControllers');

  // Payroll Routes
  app.route('/managers/')
    .get(manager.get_all_managers);

  app.route('/manager')
    .post(manager.authenticate_a_manager)

  app.route('/manager/:id')
    .get(manager.get_a_manager)
    .put(manager.update_a_manager)
    .delete(manager.delete_a_manager);
  
};
