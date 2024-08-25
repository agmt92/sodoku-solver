class SudokuSolver {


  validate(puzzleString) {
    const errors = {
      invalidChar: 'Invalid characters in puzzle',
      invalidLength: 'Expected puzzle to be 81 characters long',
  };
  let numbers = '123456789';
  if (puzzleString.length !== 81) {
    return { error: errors.invalidLength };
  }
  else if (!/^[1-9.]+$/.test(puzzleString)) {
    return { error: errors.invalidChar };
  }
  else {
    return { valid: true };
  }
};

  checkRowPlacement(puzzleString, row, column, value) {
    let rowNums = '';
    rowNums = puzzleString.slice(row * 9, row * 9 + 9);
    if (rowNums.includes(value)) {
      return false;
    } else {
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colNums = '';
    for (let i = column; i < 81; i += 9) {
      colNums += puzzleString[i];
    }
    if (colNums.includes(value)) {
      return false;
    } else {
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let rowStart = row - row % 3;
    let colStart = column - column % 3;
    let regionNums = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionNums += puzzleString[(rowStart + i) * 9 + (colStart + j)];
      }
    }
    if (regionNums.includes(value)) {
      return false;
    } else {
      return true;
    }
  }

  solve(puzzleString) {
    // Implement a backtracking algorithm to solve the puzzle
    const findEmpty = (puzzle) => {
      for (let i = 0; i < 81; i++) {
        if (puzzle[i] === '.') return i;
      }
      return -1;
    };

    const isValid = (puzzle, row, col, num) => {
      if (this.validate(puzzle).error) return false;
      const value = num.toString();
      return this.checkRowPlacement(puzzle, row, col, value) &&
             this.checkColPlacement(puzzle, row, col, value) &&
             this.checkRegionPlacement(puzzle, row, col, value) &&
             this.validate(puzzle).valid;

    };

    const solvePuzzle = (puzzle) => {
      const emptyIndex = findEmpty(puzzle);
      if (emptyIndex === -1) return puzzle;

      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;

      for (let num = 1; num <= 9; num++) {
        if (isValid(puzzle, row, col, num)) {
          const newPuzzle = puzzle.slice(0, emptyIndex) + num + puzzle.slice(emptyIndex + 1);
          const solved = solvePuzzle(newPuzzle);
          if (solved) return solved;
        }
      }
      return false;
    };

    return solvePuzzle(puzzleString);
  }
}

module.exports = SudokuSolver;