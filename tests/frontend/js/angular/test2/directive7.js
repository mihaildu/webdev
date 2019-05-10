angular.module('my-app', [])
    .directive('myDirective', function() {
        return {
            // E = only html element (this is like a react component)
            restrict: 'E',
            // can also use templateUrl
            template: 'Hi from my directive'
        };
    });
