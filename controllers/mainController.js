main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi is listening as a parameter
    var socket = io.connect('http://10.105.0.31:8088');

    $scope.measuredVoltage = 85;
    $scope.username = factory.username;
    
    var knob = document.getElementById("knob");
    var input = document.getElementById("input");
    knob.onchange = function(){
        input.value = ~~knob.value;
            socket.emit('ping', Math.round(input.value*2.55).toString());
    };
    input.onchange = function(){
        knob.value = ~~input.value;
            socket.emit('ping', Math.round(input.value*2.55).toString());
    };
    
    var voltageField = document.getElementById("voltagefield");
    socket.on('voltage', function (data) {
        console.log(data); // Päivittää datan reaaliaikaisesti Consoleen
        $scope.measuredVoltage = data; // Ei välity partial_control.html -näkymään

    });
    
});