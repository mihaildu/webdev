angular.module('my-app', ['my-service3'])
    .controller('MyController', ['logger', function MyController(logger) {
        this.var1 = 10;
        this.var2 = 20;
        this.sum = 0;

        this.logSomething = logger.logSomething;
        this.add = () => {
            this.sum = this.var1 + this.var2;
        };
    }]);
