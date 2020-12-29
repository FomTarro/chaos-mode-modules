const { Walk } = require('./module.utils');

describe("Tests accessors of all modules", () => {

    const fs = require('fs');
    const path = require('path');
    const modules = [];

    Walk(__dirname, [], /^.*\game.(js)$/).forEach((dir) => {
        const module = require(dir).Game;
        modules.push({instance: new module({log(){/* do nothing */}}), path: dir});
    });

    test.each(modules)("MODULE: [%p]", async(game) => 
    {   
        expect(fs.existsSync(path.join(game.path, '../', game.instance.path))).toBe(true);
        expect(typeof game.instance.prompt).toBe('string');
    });

});
