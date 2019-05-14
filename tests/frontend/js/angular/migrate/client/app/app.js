import angular from 'angular';
import createReactClass from "create-react-class";
import lodash from "lodash";
import ngRedux from "ng-redux";

import { angularComponents, reactComponents } from './components/components';
import AppComponent from './app.component';
import store from './store';

const app = angular.module('app', [ngRedux, angularComponents]);

app.config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
});

app.config(($ngReduxProvider) => {
    $ngReduxProvider.provideStore(store);
});

app.component('app', AppComponent);

for (let reactComponent in reactComponents) {
    app.component(lodash.lowerFirst(reactComponent), reactComponents[reactComponent]);
}
