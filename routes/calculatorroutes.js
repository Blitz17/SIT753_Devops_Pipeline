const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorcontroller');

router.post('/calculate', calculatorController.handleCalculation);
router.get('/history', calculatorController.getHistory);
router.delete('/history', calculatorController.clearHistory);

module.exports = router;
