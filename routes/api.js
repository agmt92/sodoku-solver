'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }
      let valid = solver.validate(puzzle);
      if (valid.error) {
        return res.json(valid);
      }
      let row = coordinate[0].charCodeAt(0) - 'A'.charCodeAt(0);
      let column = parseInt(coordinate[1]) - 1;
      if (parseInt(row) < 0 || parseInt(row) > 8 || parseInt(column) < 0 || parseInt(column) > 8) {
        return res.json({ error: 'Invalid coordinate' });
      }
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }
      console.log(coordinate, row, column);
      let checkRow = solver.checkRowPlacement(puzzle, row, column, value);
      let checkCol = solver.checkColPlacement(puzzle, row, column, value);
      let checkRegion = solver.checkRegionPlacement(puzzle, row, column, value);
      let checkSame = solver.checkIfSameEntry(puzzle, row, column, value);
      let conflict = [];
      if (!checkRow && !checkCol && !checkRegion) {
        return res.json({ valid: true });
      } else if (checkSame && checkRow && checkCol && checkRegion) {
        return res.json({ valid: true });
      } else if (!checkSame && checkRow && checkCol && checkRegion) {
        return res.json({ valid: false, conflict: ['row', 'column', 'region'] });
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