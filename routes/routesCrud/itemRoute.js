const { Router } = require('express');
const itemController = require('../../controllers/itemController');
const router = Router();

router.post('/create', itemController.create);

module.exports = router;