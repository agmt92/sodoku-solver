'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      let solution = solver.solve(puzzle);
      let row = coordinate[0].charCodeAt(0) - 'A'.charCodeAt(0);
      let column = parseInt(coordinate[1]) - 1;
      let valid = solver.validate(puzzle);
      let checkRow = solver.checkRowPlacement(puzzle, row, column, value);
      let checkCol = solver.checkColPlacement(puzzle, row, column, value);
      let checkRegion = solver.checkRegionPlacement(puzzle, row, column, value);
      let checkSame = solver.checkIfSameEntry(puzzle, row, column, value);
      let conflict = [];
      console.log('coordinate, value', coordinate, value);
      console.log('puzzle', puzzle);
      // console.log(solution.charAt(row * 9 + column));
      // console.log(value);
      // console.log(solution.charAt(row * 9 + column) == value);
      // validate inputs
      if (valid.error) {
        return res.json(valid);
      } else if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      } else if (coordinate.length !== 2 || !/[A-I]/.test(coordinate[0]) || !/[1-9]/.test(coordinate[1])) {
        return res.json({ error: 'Invalid coordinate' });
      } else if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      } // if all pass, check if correct answer first
      else if (solution.charAt(row * 9 + column) == value) {
        return res.json({ valid: true });
        } else if (checkSame) {
          return res.json({ valid: true });
        } else {
          if (!checkRow) {
            conflict.push('row');
          }
          if (!checkCol) {
            conflict.push('column');
          }
          if (!checkRegion) {
            conflict.push('region');
          }
          return res.json({ valid: false, conflict });
        }
    });
    
    
  app.route('/api/solve')
    .post((req, res) => {
      let { puzzle } = req.body;
      if (!puzzle) {
        return res.status(200).json({ error: 'Required field missing' });
      }
      let valid = solver.validate(puzzle);
      if (valid.error) {
        return res.json(valid);
      }
      let solution = solver.solve(puzzle);
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      return res.json({ solution });
    });
};