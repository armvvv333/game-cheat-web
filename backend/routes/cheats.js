const express = require('express');
const router = express.Router();
const cheatsController = require('../controllers/cheatsController');

router.get('/:categoryId', cheatsController.getCheats);
router.post('/', cheatsController.createCheat);
router.put('/:id', cheatsController.updateCheat);
router.delete('/:id', cheatsController.deleteCheat);

module.exports = router;
