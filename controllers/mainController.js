main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi is listening as a parameter
    var socket = io.connect('http://10.105.0.31:8088');

    // 
    var knob = document.getElementById("knob");
    var input = document.getElementById("input");
    knob.onchange = function(){
        input.value = ~~knob.value;
            socket.emit('ping', Math.round(input.value*2.55).toString());
    }
    input.onchange = function(){
        knob.value = ~~input.value;
            socket.emit('ping', Math.round(input.value*2.55).toString());
    }
    
    
});