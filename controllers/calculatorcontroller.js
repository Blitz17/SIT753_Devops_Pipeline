const calculatorModel = require('../models/calculatorModel');

function handleCalculation(req, res) {
    const { num1, num2, operation } = req.body;
    console.log(`[CONTROLLER] Received calculation request: ${operation} on ${num1}, ${num2}`);
    if (num1 === undefined || num2 === undefined || !operation) {
        console.error('[CONTROLLER] Missing parameters');
        return res.status(400).json({ ERROR: 'Please provide num1, num2, and operation in the request body' });
    }
    try {
        const result = calculatorModel.calculate(num1, num2, operation);
        console.log(`[CONTROLLER] Result: ${result}`);
        res.json({ Result: result });
    } catch (err) {
        console.error(`[CONTROLLER] Error: ${err.message}`);
        res.status(400).json({ ERROR: err.message });
    }
}

function getHistory(req, res) {
    console.log('[CONTROLLER] Get history request received');
    res.json({ History: calculatorModel.getHistory() });
}

function clearHistory(req, res) {
    console.log('[CONTROLLER] Clear history request received');
    calculatorModel.clearHistory();
    res.json({ Message: 'History cleared' });
}

module.exports = { handleCalculation, getHistory, clearHistory };