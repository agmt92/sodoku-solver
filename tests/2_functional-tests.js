const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'solution');
                done();
            });
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field missing');
                done();
            });
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '..9..5.1.85.4....2232......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
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

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A2', value: '9' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'valid');
                assert.isFalse(res.body.valid);
                assert.property(res.body, 'conflict');
                assert.include(res.body.conflict, 'row');
                done();
            });
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A2', value: '5' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'valid');
                assert.isFalse(res.body.valid);
                assert.property(res.body, 'conflict');
                assert.include(res.body.conflict, 'row');
                assert.include(res.body.conflict, 'column');
                done();
            });
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'B3', value: '2' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'valid');
                assert.isFalse(res.body.valid);
                assert.property(res.body, 'conflict');
                assert.include(res.body.conflict, 'row');
                assert.include(res.body.conflict, 'column');
                done();
            });
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A2', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });

    test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.', coordinate: 'A2', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'Z9', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            });
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A2', value: '10' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
    });

});