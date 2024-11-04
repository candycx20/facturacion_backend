const { Router } = require('express');
const facturaController = require('../../controllers/facturaController');
const router = Router();

router.post('/create', facturaController.create);

module.exports = router;