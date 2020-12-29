class Game{
    constructor(log){
        this.log = log;
        this.number = Math.floor(5 * Math.random()) + 2;
    }

    get prompt(){ return "tap"; } 

    get setup(){ return this.number; }

    get path(){
        return './tap.html';
    }

    get credits(){
        return 'sunshine committee'
    }

    check(inputs){
        this.log.log(`checking: ${inputs}`);
        return (inputs.count <= 0)
    }

}

module.exports.Game = Game;