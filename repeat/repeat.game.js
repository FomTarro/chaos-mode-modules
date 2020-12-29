const words = [
    'greeting', 'computer', 'gaming', 'fiasco', 'hurry', 
    'slowly', 'sloth', 'tortoise', 'rapidly', 'hastily', 'incredible',
    'harbinger', 'desolate', 'reincarnation', 'entropy', 'fortune', 'blessing',
    'sunshine', 'committee', 'extrapolate',
]

class Game{
    constructor(log){
        this.log = log;
        this.word = words[Math.floor(words.length * Math.random())];
    }

    get prompt(){ return "repeat"; } 

    get setup(){ return this.word; }

    get path(){
        return './repeat.html';
    }

    check(inputs){
        this.log.log(`checking: ${inputs}`);
        if(inputs.word){
            return this.ciEquals(this.word, inputs.word);
        }
        return false;
    }

    ciEquals(a, b) {
        return typeof a === 'string' && typeof b === 'string'
            ? a.trim().localeCompare(b.trim(), undefined, { sensitivity: 'accent' }) === 0
            : a.trim() === b.trim();
    }

}

module.exports.Game = Game;