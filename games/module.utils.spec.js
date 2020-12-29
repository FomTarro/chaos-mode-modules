const { Walk } = require('./module.utils');
const path = require('path');

describe("Tests about file tools", () => {
    
    test('checking ability to initialize list', () => {
        const dir = path.join(__dirname, 'tap');
        const results = Walk(dir);
        expect(results.length).toBe(6);
    });

    test('checking ability to traverse a directory with no regex', () => {
        const dir = path.join(__dirname, 'tap');
        const results = Walk(dir, []);
        expect(results.length).toBe(6);
    });

    test('checking ability to traverse a directory with regex', () => {
        const dir = path.join(__dirname, 'tap');
        const results = Walk(dir, [], /^.*\.(js)$/  );
        expect(results.length).toBe(3);
    });
});