var count = 1000;

function config(setup){
    count = setup;
    document.getElementById('counter').innerHTML = String(count).padStart(2, '0')
}

function tap(){
    count = count - 1;
    document.getElementById('counter').innerHTML = String(count).padStart(2, '0')
    var inputs = { count: count };
    try{
        parent.network.checkInputs(inputs);
    }catch{
        console.warn('checking input of: [' + JSON.stringify(inputs) + ']');
    }
}