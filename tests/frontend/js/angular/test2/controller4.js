angular.module('my-app', [])
    .controller('MyController', ['$scope', function MyController($scope) {

        // this gives access to entire scope
        console.log($scope);

        $scope.var1 = 10;
        $scope.var2 = 20;
    }]);
