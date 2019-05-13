import angular from 'angular';
import mainComponent from './maincomponent.component';

let mainModule = angular.module('maincomponent', [])
.component('maincomponent', mainComponent)
.name;

export default mainModule;
