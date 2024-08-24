const chai = require('chai');
const assert = chai.assert;
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

    // Logic handles a valid puzzle string of 81 characters
    test('Logic handles a valid puzzle string of 81 characters', () => {
        solver = new Solver();
        let puzzleString = '';
        for (let i = 0; i < 81; i++) {
            puzzleString += '1';
        }
        assert.deepEqual(solver.validate(puzzleString), { valid: true });
    }
    );
    // Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        solver = new Solver();
        let puzzleString = '';
        for (let i = 0; i < 81; i++) {
            puzzleString += 'a';
        }
        assert.deepEqual(solver.validate(puzzleString), { error: 'Invalid characters in puzzle' });
    }
    );
    // Logic handles a puzzle string that is not 81 characters in length
    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        solver = new Solver();
        let puzzleString = '';
        for (let i = 0; i < 80; i++) {
            puzzleString += '1';
        }
        assert.deepEqual(solver.validate(puzzleString), { error: 'Expected puzzle to be 81 characters long' });
    }
    );
    // Logic handles a valid row placement
    test('Logic handles a valid row placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, 2));
    }
    );

    // Logic handles an invalid row placement
    test('Logic handles an invalid row placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, 1));
    }
    );
    // Logic handles a valid column placement
    test('Logic handles a valid column placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isTrue(solver.checkColPlacement(puzzleString, 0, 0, 2));
    }
    );
    // Logic handles an invalid column placement
    test('Logic handles an invalid column placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, 1));
    }
    );
    // Logic handles a valid region (3x3 grid) placement
    test('Logic handles a valid region (3x3 grid) placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 0, 2));
    }
    );
    // Logic handles an invalid region (3x3 grid) placement
    test('Logic handles an invalid region (3x3 grid) placement', () => {
        solver = new Solver();
        let puzzleString = '1'.repeat(81);
        assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 0, 1));
    }
    );
    // Valid puzzle strings pass the solver
    test('Valid puzzle strings pass the solver', () => {
        solver = new Solver();
        //access the puzzle string from the puzzlesAndSolutions array
        let puzzleString = puzzlesAndSolutions[0][0];
        let puzzleSolution = puzzlesAndSolutions[0][1];
        assert.equal(solver.solve(puzzleString), puzzleSolution);
    }
    );

    // Invalid puzzle strings fail the solver
    test('Invalid puzzle strings fail the solver', () => {
        let puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' , 
        solver = new Solver();
        let expected = false;
        assert.equal(solver.solve(puzzle), expected);
    }
    );

    // Solver returns the expected solution for an incomplete puzzle
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        solver = new Solver();
        let puzzleString = puzzlesAndSolutions[0][0];
        let expectedSolution = puzzlesAndSolutions[0][1];
        assert.equal(solver.solve(puzzleString), expectedSolution);
    });


});
