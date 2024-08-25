const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

chai.use(chaiHttp);

suite('FCC Tests', () => {

    // Coordinate A1, Value: 1. Expected: { "valid": false, "conflict": [ "row", "column" ] }
    test('A1-1 Expected: { "valid": false, "conflict": [ "row", "column" ] }', () => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings, coordinate: 'A1', value: 1 })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column'] });
            });
    });

    // Coordinate A10, Value: 7. Expected: { "error": "Invalid coordinate" }
    test('Logic handles an invalid column placement', () => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: puzzleStrings, coordinate: 'A10', value: 7 })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
            });
    });

    // Coordinate A1, Value: 7. Expected: { valid: true }
    // test('Logic handles a valid row placement', () => {
    //     chai.request(server)
    //         .post('/api/check')
    //         .send({ puzzle: puzzleStrings, coordinate: 'A1', value: '7' })
    //         .end(( res) => {
    //             assert.equal(res.status, 200);
    //             assert.deepEqual(res.json({ valid: true }));
    //         });
    // });
});
