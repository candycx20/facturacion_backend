const { Router } = require('express');
const router = Router();

const emisorRoute = require('./routesCrud/emisorRoute');
const facturaRoute = require('./routesCrud/facturaRoute');
const receptorRoute = require('./routesCrud/receptorRoute');
const itemRoute = require('./routesCrud/itemRoute');

module.exports = (app) => {

     app.use('/api/emisores', emisorRoute);
     app.use('/api/facturas', facturaRoute);
     app.use('/api/receptores', receptorRoute);
     app.use('/api/items', itemRoute);

     app.use('/', router);
}