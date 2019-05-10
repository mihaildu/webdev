angular.module('my-app', [])
    .controller('MyController', ['common', function ctrl(com) {
        this.var1 = 10;
        this.var2 = 20;
        this.logSomething = com;
    }])
    .factory('common', function() {
        return function() {
            console.log('common fcn called');
        }
    })
;
