const http = require('http');
const webSocket = require('ws');
const express = require("express");
const path = require("path");
const fs = require('fs');
const { JSDOM } = require('jsdom');
const { Walk } = require('../games/module.utils');

const port = 8080;

const dom = new JSDOM(fs.readFileSync(path.resolve('index.html')));
const modules = [];
Walk(path.join(__dirname, '..'), [], /^.*\game.(js)$/).forEach((dir) => {
    const module = require(dir).Game;
    modules.push({instance: new module({log(){/* do nothing */}}), path: dir});
});
const map = new Map();
const gameParent = dom.window.document.getElementById('microgames');
const optParent = dom.window.document.getElementById('microgame-select');
for(let i = 0; i < modules.length; i++){
    // console.log(modules[i].path);
    const relativePath = path.join(path.dirname(path.relative(__dirname, modules[i].path)), modules[i].instance.path);
    const id = path.relative(__dirname, modules[i].path);
    
    const iframe = dom.window.document.createElement('iframe');
    iframe.src = relativePath;
    iframe.id = id
    iframe.classList.add('hide');
    gameParent.appendChild(iframe);

    const option = dom.window.document.createElement('option');
    option.value = id;
    option.innerHTML = id;
    optParent.appendChild(option);
    map.set(id, require(id).Game);
}

const app = express();
app.get('/', (req, res) => {
    res.status(200).send(dom.serialize());
});

app.use(express.static('..'));

let selectedGame;
const httpServer = http.createServer(app);
const server = new webSocket.Server({server: httpServer, path:'/'});
httpServer.listen(port, () => {
    console.log(`chaos-mode test server listening on port: ${port}`);
    server.on('connection', (ws) => {
        ws.on('message', (message) => {
            const obj = JSON.parse(message)
            if(obj.command){
                if(obj.command == 'SELECT'){
                    const game = map.get(obj.id);
                    selectedGame = new game({log(a){},warn(a){},error(a){}});
                    // console.log(selectedGame);
                    ws.send(JSON.stringify({
                        id: obj.id,
                        setup: selectedGame.setup,
                    }));
                }else if(obj.command == 'CHECK'){
                    ws.send(JSON.stringify({
                        check: selectedGame.check(obj.inputs),
                    }));
                }
            }
        });
        ws.on('close', (ws) => {
            console.log('closing connection!');
        });
    })
});