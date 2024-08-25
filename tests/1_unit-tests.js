const chai = require('chai');
const assert = chai.assert;
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
  
  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const validation = solver.validate(puzzleString);
    assert.deepEqual(validation, { valid: true });
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const puzzleString = 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const validation = solver.validate(puzzleString);
    assert.deepEqual(validation, { error: 'Invalid characters in puzzle' });
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    const validation = solver.validate(puzzleString);
    assert.deepEqual(validation, { error: 'Expected puzzle to be 81 characters long' });
  });

  test('Logic handles a valid row placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkRowPlacement(puzzleString, 0, 2, '3');
    assert.isTrue(isValid);
  });

  test('Logic handles an invalid row placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkRowPlacement(puzzleString, 0, 2, '9');
    assert.isFalse(isValid);
  });

  test('Logic handles a valid column placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkColPlacement(puzzleString, 0, 2, '3');
    assert.isTrue(isValid);
  });

  test('Logic handles an invalid column placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkColPlacement(puzzleString, 0, 2, '9');
    assert.isFalse(isValid);
  });

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkRegionPlacement(puzzleString, 0, 1, '9');
    assert.isFalse(isValid);
  });

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const isValid = solver.checkRegionPlacement(puzzleString, 0, 1, '9');
    assert.isFalse(isValid);
  });

  test('Valid puzzle strings pass the solver', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const solution = solver.solve(puzzleString);
    assert.isNotFalse(solution);
  });

  test('Invalid puzzle strings fail the solver', () => {
    const puzzleString = 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const solution = solver.solve(puzzleString);
    assert.deepEqual(solution, { error: 'Puzzle cannot be solved' });
  });

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const puzzleString = puzzlesAndSolutions[0][0];
    const expectedSolution = puzzlesAndSolutions[0][1];
    const solution = solver.solve(puzzleString);
    assert.equal(solution, expectedSolution);
  });

});