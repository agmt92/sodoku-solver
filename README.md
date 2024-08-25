# Sudoku Solver

This project is a Sudoku Solver application built as part of the FreeCodeCamp Quality Assurance certification. The application provides an API to solve Sudoku puzzles and check the validity of puzzle placements.

## Links

- FreeCodeCamp Test Page: [FreeCodeCamp Sudoku Solver](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver)
- Running Demo Page: [Sudoku Solver Demo](https://sodoku-solver-8bd9620b34c6.herokuapp.com/)

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- Installation
- Usage
- Testing
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- Links

## Project Overview

The Sudoku Solver application provides two main functionalities:
1. Solving a given Sudoku puzzle.
2. Checking the validity of a placement in a Sudoku puzzle.

The application is built using Node.js and Express, with Mocha and Chai for testing.

## Directory Structure

```
sudoku-solver/
├── controllers/
│   ├── puzzle-strings.js
│   └── sudoku-solver.js
├── public/
│   ├── index.html
│   └── style.css
├── routes/
│   └── api.js
├── tests/
│   ├── 1_unit-tests.js
│   └── 2_functional-tests.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

### controllers/
- **puzzle-strings.js**: Contains sample Sudoku puzzles and their solutions.
- **sudoku-solver.js**: Contains the main logic for validating and solving Sudoku puzzles.

### public/
- **index.html**: The main HTML file for the front-end interface.
- **style.css**: The CSS file for styling the front-end interface.

### routes/
- **api.js**: Defines the API endpoints for solving puzzles and checking placements.

### tests/
- **1_unit-tests.js**: Contains unit tests for the Sudoku solver logic.
- **2_functional-tests.js**: Contains functional tests for the API endpoints.

### Other Files
- **.env**: Environment variables configuration file.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Contains project metadata and dependencies.
- **server.js**: The main server file that starts the Express application.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sudoku-solver.git
   cd sudoku-solver
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

The application will be running on [`http://localhost:3000`](http://localhost:3000).

## Usage

### Solving a Sudoku Puzzle

To solve a Sudoku puzzle, send a POST request to `/api/solve` with the puzzle string.

Example request:
```json
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
}
```

### Checking a Puzzle Placement

To check the validity of a placement in a Sudoku puzzle, send a POST request to `/api/check` with the puzzle string, coordinate, and value.

Example request:
```json
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A2",
  "value": "3"
}
```

## Testing

To run the tests, use the following command:
```bash
npm test
```

The tests are divided into unit tests and functional tests:
- **Unit Tests**: Test the core logic of the Sudoku solver.
- **Functional Tests**: Test the API endpoints.

## API Endpoints

### POST /api/solve

Solves a given Sudoku puzzle.

**Request Body:**
```json
{
  "puzzle": "string"
}
```

**Response:**
- On success:
  ```json
  {
    "solution": "string"
  }
  ```
- On error:
  ```json
  {
    "error": "string"
  }
  ```

### POST /api/check

Checks the validity of a placement in a Sudoku puzzle.

**Request Body:**
```json
{
  "puzzle": "string",
  "coordinate": "string",
  "value": "string"
}
```

**Response:**
- On success:
  ```json
  {
    "valid": true
  }
  ```
- On conflict:
  ```json
  {
    "valid": false,
    "conflict": ["row", "column", "region"]
  }
  ```
- On error:
  ```json
  {
    "error": "string"
  }
  ```

## Testing with Postman

You can use Postman to test the API endpoints. Follow these steps:

1. **Install Postman**: If you haven't already, download and install Postman from [here](https://www.postman.com/downloads/).

2. **Create a new request**:
   - Open Postman and click on "New" to create a new request.
   - Select "Request" and give it a name, e.g., "Solve Sudoku".

3. **Set up the request**:
   - For solving a puzzle:
     - Set the request type to `POST`.
     - Enter the URL: `http://localhost:3000/api/solve`.
     - Go to the "Body" tab, select "raw" and set the format to "JSON".
     - Enter the following JSON:
       ```json
       {
         "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
       }
       ```
     - Click "Send" to see the response.

   - For checking a puzzle placement:
     - Set the request type to `POST`.
     - Enter the URL: `http://localhost:3000/api/check`.
     - Go to the "Body" tab, select "raw" and set the format to "JSON".
     - Enter the following JSON:
       ```json
       {
         "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
         "coordinate": "A2",
         "value": "3"
       }
       ```
     - Click "Send" to see the response.

4. **Check the response**: Postman will display the response from the server, which will include the solution or validation result.

---

This project is part of the FreeCodeCamp Quality Assurance certification. Feel free to contribute or raise issues if you find any bugs or have suggestions for improvements. https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver
