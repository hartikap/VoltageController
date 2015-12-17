main_module.controller('loginController', function($scope, factory, $location) {
    
    $scope.loginClicked = function () {
        
        console.log($scope.username);
        factory.username = $scope.username;
        $location.path('/controller');
        
    }
    
    
    
});