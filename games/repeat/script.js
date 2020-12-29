

function config(setup){
    document.getElementById('word').innerHTML = '"' + setup + '"';
    document.getElementById('input').value = '';
}

function submit(word){
    var inputs = { word: word };
    try{
        parent.network.checkInputs(inputs);
    }catch{
        console.warn('checking input of: [' + JSON.stringify(inputs) + ']');
    }
}