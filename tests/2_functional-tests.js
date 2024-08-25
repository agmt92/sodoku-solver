const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    // Solve a puzzle with valid puzzle string: POST request to /api/solve
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0] })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { solution: puzzleStrings.puzzlesAndSolutions[0][1] });
                done();
            });
    });

    // Solve a puzzle with missing puzzle string: POST request to /api/solve
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing');
                done();
            });
    });

    // Solve a puzzle with invalid characters: POST request to /api/solve
    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0].slice(0,-1).concat('a') })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });

    // Solve a puzzle with incorrect length: POST request to /api/solve
    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0].slice(0,-1) })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    // Solve a puzzle that cannot be solved: POST request to /api/solve
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0].slice(0,-2).concat('11') })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            });
    });

    // Check a puzzle placement with all fields: POST request to /api/check
    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'A2', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { "valid": true });
                done();
            });
    });

    // Check a puzzle placement with single placement conflict: POST request to /api/check
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'B2', value: '5' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ['region'] });
                done();
            });
    });

    // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'B5', value: '1' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: [ "row", "column", "region" ] });
                done();
            });
     });
            
    // Check a puzzle placement with missing required fields: POST request to /api/check
    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'B2', value: '' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
    });

    // Check a puzzle placement with invalid characters: POST request to /api/check
    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'B2', value: 'z' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
    });

    // Check a puzzle placement with incorrect length: POST request to /api/check
    test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0].concat('1'), coordinate: 'A2', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'A0 ', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            });
    });

    // Check a puzzle placement with invalid placement value: POST request to /api/check
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings.puzzlesAndSolutions[0][0], coordinate: 'A2', value: '10' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
    });
});