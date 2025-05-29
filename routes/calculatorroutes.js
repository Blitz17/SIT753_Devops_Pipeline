import express from 'express';
import * as calculatorController from '../controllers/calculatorcontroller.js';

const router = express.Router();

router.post('/calculate', calculatorController.handleCalculation);
router.get('/history', calculatorController.getHistory);
router.delete('/history', calculatorController.clearHistory);

export default router;
