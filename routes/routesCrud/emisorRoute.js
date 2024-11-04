const { Router } = require('express');
const emisorController = require('../../controllers/emisorController');
const router = Router();

router.post('/find', emisorController.findNit);

module.exports = router;