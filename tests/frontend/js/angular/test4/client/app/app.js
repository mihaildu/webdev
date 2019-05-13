import angular from 'angular';
import Components from './components/components';
import AppComponent from './app.component';

angular.module('app', [
    Components
  ])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);
