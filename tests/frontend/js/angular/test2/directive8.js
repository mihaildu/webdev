angular.module('my-app', [])
    .controller('MyController', ['$scope', function(scp){
        scp.tim = 'Tim';
        scp.john = 'John';
    }])
    .directive('myDirective', function() {
        return {
            restrict: 'E',
            scope: {
                // {{name}} = $scope.[value of name attr]
                name: '=name'
            },
            template: 'Hi, my name is {{name}}'
        };
    });
