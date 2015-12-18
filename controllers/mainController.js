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
        socket.emit('voltageOut', Math.round(input.value*2.55).toString());
    };
    input.onchange = function(){
        knob.value = ~~input.value;
        socket.emit('voltageOut', Math.round(input.value*2.55).toString());
    };
    

    socket.on('voltageIn', function (data) {
        //console.log(data); // Päivittää datan reaaliaikaisesti Consoleen
        $scope.measuredVoltage = data*5/1023; // Ei välity partial_control.html -näkymään
        $scope.$apply();
    });
    
});