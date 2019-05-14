import angular from 'angular';
import createReactClass from "create-react-class";

import { angularComponents, reactComponents } from './components/components';
import AppComponent from './app.component';

const app = angular.module('app', ['react', angularComponents]);

app.config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
});

app.component('app', AppComponent);

for (let reactComponent in reactComponents) {
    app.value(reactComponent, reactComponents[reactComponent]);
}
