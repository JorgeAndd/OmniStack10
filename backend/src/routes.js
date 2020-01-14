const { Router } = require('express');

const routes = Router();

// Parameters types:
// Query params: request.query (filters, sorting, paging, etc...)
// Route params: request.params (resource id on change or deletion)
//         Body: request.body (data for creation or change of a registry)     

routes.post('/user', (request, response) => {
    console.log(request.body)
    return response.json({ message: 'Hello Omni' });
});

module.exports = routes;