main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi is listening as a parameter
    var socket = io.connect('http://192.168.0.102:8088');

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
        $scope.measuredVoltage = data*5/1023;
        $scope.$apply();
    });
    
});