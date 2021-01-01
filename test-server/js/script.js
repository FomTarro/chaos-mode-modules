document.getElementById('microgame-select').addEventListener('change', selectMicrogame);
var network = {
    create(){
        var protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
        this.socket = new WebSocket(protocolPrefix + '//' + location.host + location.pathname);
        this.socket.onmessage = function(message){
            var obj = JSON.parse(message.data);
            console.log(obj);
            if(obj.id){
                showMicrogame(obj.id);
            }
            if(obj.check != undefined){
                document.getElementById('check').innerText = String(obj.check);
            }
            if(obj.setup){
                document.getElementById(obj.id).contentWindow.config(obj.setup);
            }
        };
    },
    checkInputs(inputs){
        console.log(inputs);
        document.getElementById('inputs').innerText = JSON.stringify(inputs);
        this.socket.send(JSON.stringify({
            command: 'CHECK',
            inputs: inputs
        }));
    },
    selectMicrogame(id){
        this.socket.send(JSON.stringify({
            command: 'SELECT',
            id: id,
        }));
    }
}

function selectMicrogame(e){
    network.selectMicrogame(e.target.value);
}

function showMicrogame(id){
    var frames = document.getElementsByTagName('iframe');
    for(var i = 0; i < frames.length; i++){
        frames[i].classList.add('hide');
    }
    document.getElementById('inputs').innerText = "---"
    document.getElementById('check').innerText = "---";
    document.getElementById(id).classList.remove('hide');
}

network.create();