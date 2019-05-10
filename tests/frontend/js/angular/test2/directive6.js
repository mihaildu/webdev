angular.module('my-app', [])
    .controller('MyController', ['$scope', function (scp) {
        scp.val = 100;
    }])
    .directive('myDirective', function() {
        return {
            template: '{{val}}'
        };
    });
