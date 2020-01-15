const { Router } = require('express');

const devController = require('./controllers/devController');

const routes = Router();

// Parameters types:
// Query params: request.query (filters, sorting, paging, etc...)
// Route params: request.params (resource id on change or deletion)
//         Body: request.body (data for creation or change of a registry)     

routes.post('/devs', devController.store);

module.exports = routes;