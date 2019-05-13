import angular from 'angular';
import incrementComponent from './increment.component';

let incrementModule = angular.module('increment', [])
.component('increment', incrementComponent)
.name;

export default incrementModule;

