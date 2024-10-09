var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('MainController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.title = 'My AngularJS App';
    $scope.login = function() {
        console.log('Login function called');
        $http.get('http://localhost:4044/api/auth/login')
            .then(function(response) {
                console.log('Received response:', response);
                $window.location.href = response.data.redirectUrl;
            })
            .catch(function(error) {
                console.error('Error getting login URL:', error);
            });
    };
}]);

app.controller('HomeController', ['$scope', function($scope) {
    // Home page logic here
}]);