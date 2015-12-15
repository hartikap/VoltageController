var socket = io.connect('http://192.168.69.123:8088');

/*socket.on('pong', function (data) {
    console.log("pong");
});*/



$(document).ready(function() {

    console.log("dom Control ready");
    $("#welcometext").text("Welcome "+ sessionStorage.username + "!");
    
    $("#button2").click(function() {
        
        //var voltage = Math.round(input.value*2.55);
        //var voltage_string = voltage.toString();
        //console.log(voltage);
        //socket.emit('ping', voltage);
        //socket.emit('ping', voltage_string);
        //socket.emit('voltage update', voltage);
        socket.emit('ping', Math.round(input.value*2.55).toString());
        
    });
    
    
});