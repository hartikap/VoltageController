$(document).ready(function(){
    
    console.log("DOM ready");
    
    $("#button1").click(function(){
        
        console.log("Login pressed");
        sessionStorage['username'] = $("#usernameinput").val();
        window.location.replace("http://localhost:8081/Control.html");
       // $(location).attr('href', 'http://localhost:8081/Control.html');
        //console.log(window.location);
       // sessionStorage['location'] = window.location;
        
        
    });//.done(loginResponseHandler);
    
    
    
});


/*
function loginResponseHandler(data) {
    
    if (data.status == "Ok") {
        window.location.href = 'http://localhost:3000/Control.html';
    } else {
        console.log(data.status);
    }
        
    
}*/

    
