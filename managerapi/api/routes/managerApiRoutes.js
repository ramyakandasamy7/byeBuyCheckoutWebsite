'use strict';

module.exports = function(app) {
  var manager = require('../controllers/managerApiControllers');

  // Payroll Routes
  app.route('/managers/')
    .get(manager.get_all_managers);


  app.route('/manager/:id')
    .get(manager.get_a_manager)
    .post(manager.update_a_manager)
    .delete(manager.delete_a_manager);

};
