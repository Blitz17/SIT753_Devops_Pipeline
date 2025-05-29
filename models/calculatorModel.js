const history = [];

function calculate(num1, num2, operation) {
    console.log(`[MODEL] Performing ${operation} on ${num1} and ${num2}`);
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) throw new Error('Cannot divide by zero');
            result = num1 / num2;
            break;
        default:
            throw new Error('Invalid operation');
    }
    const command = { operation, num1, num2, result };
    history.push(command);
    console.log(`[MODEL] Operation stored in history:`, command);
    return result;
    }

    function getHistory() {
        console.log('[MODEL] Retrieving history');
        return history;
    }

    function clearHistory() {
        console.log('[MODEL] Clearing history');
        history.length = 0;
    }
module.exports = { calculate, getHistory, clearHistory };