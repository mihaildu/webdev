import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import MainComponent from './maincomponent/maincomponent';
import IncrementComponent from './increment/increment';

import ReactComp from './reactcomp/ReactComp';

let angularComponents = angular.module('app.components', [
    Home,
    About,
    MainComponent,
    IncrementComponent
])

.name;

let reactComponents = {
    ReactComp
};

export { angularComponents, reactComponents };
