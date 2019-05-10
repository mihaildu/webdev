// module(app-name, [dependency modules]).controller(ctrl-name,
//   [dependencies from modules, function])
angular.module('my-app', [])
    .controller('MyController', function MyController() {
        this.var1 = 10;
        this.var2 = 20;
        this.sum = 0;

        this.logSomething = () => {
            console.log('hi');
        };
        this.add = () => {
            this.sum = this.var1 + this.var2;
        };
    });
