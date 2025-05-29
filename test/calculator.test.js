const chai = require('chai');
const expect = chai.expect;

const calculator = require('../models/calculatorModel');

describe('Calculator Model Tests', () => {

  beforeEach(() => {
    calculator.clearHistory();
  });

  describe('calculate()', () => {
    it('should add two numbers', () => {
      const result = calculator.calculate(2, 3, 'add');
      expect(result).to.equal(5);
    });

    it('should subtract two numbers', () => {
      const result = calculator.calculate(5, 3, 'subtract');
      expect(result).to.equal(2);
    });

    it('should multiply two numbers', () => {
      const result = calculator.calculate(4, 2, 'multiply');
      expect(result).to.equal(8);
    });

    it('should divide two numbers', () => {
      const result = calculator.calculate(10, 2, 'divide');
      expect(result).to.equal(5);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => calculator.calculate(5, 0, 'divide')).to.throw('Cannot divide by zero');
    });

    it('should throw an error for invalid operations', () => {
      expect(() => calculator.calculate(5, 5, 'mod')).to.throw('Invalid operation');
    });
  });

  describe('getHistory()', () => {
    it('should return history after operations', () => {
      calculator.calculate(1, 2, 'add');
      calculator.calculate(3, 1, 'subtract');
      const hist = calculator.getHistory();

      expect(hist).to.be.an('array');
      expect(hist).to.have.lengthOf(2);
      expect(hist[0]).to.include({ operation: 'add', num1: 1, num2: 2, result: 3 });
      expect(hist[1]).to.include({ operation: 'subtract', num1: 3, num2: 1, result: 2 });
    });
  });

  describe('clearHistory()', () => {
    it('should clear the history array', () => {
      calculator.calculate(1, 2, 'add');
      calculator.clearHistory();
      const hist = calculator.getHistory();
      expect(hist).to.be.an('array').that.is.empty;
    });
  });

});
