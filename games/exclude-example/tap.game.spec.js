describe("Tests the Tap microgame", () => {

    test('returns true when count is zero or less', () => {
        const { Game } = require('./tap.game');
        const instance = new Game({log() { /* do nothing */}});
        instance.number = 5;
        let check = instance.check({count: 4})
        expect(check).toBe(false);
        check = instance.check({count: 0});
        expect(check).toBe(true);
        check = instance.check({count: -1});
        expect(check).toBe(true);
    });

    test('returns the randomly generated number field as setup data', () => {
        const { Game } = require('./tap.game');
        const instance = new Game({log() { /* do nothing */}});
        instance.number = 5;
        expect(instance.setup).toBe(5);
    })
});
