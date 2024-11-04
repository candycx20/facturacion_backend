const { Router } = require('express');
const receptorController = require('../../controllers/receptorController');
const router = Router();

router.post('/find', receptorController.findNit);

module.exports = router;