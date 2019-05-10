angular.module('some-app', [])
    .controller('MyController', function () {
        this.hero = 'Some name';
    })
    // component (similar to directives)
    .component('myComp', {
        template: 'Hi {{$ctrl.hero}}',
        bindings: {
            hero: '='
        }
    });
