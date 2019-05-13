import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import MainComponent from './maincomponent/maincomponent';
import IncrementComponent from './increment/increment';

let componentModule = angular.module('app.components', [
    Home,
    About,
    MainComponent,
    IncrementComponent
])

.name;

export default componentModule;
