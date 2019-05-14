import angular from 'angular';
import { react2angular } from "react2angular";

import Home from './home/home';
import About from './about/about';
import MainComponent from './maincomponent/maincomponent';
import IncrementComponent from './increment/increment';

import ReactIncrement from './reactincrement/Increment';
import ReactComp from './reactcomp/ReactComp';

let angularComponents = angular.module('app.components', [
    Home,
    About,
    MainComponent,
    IncrementComponent,
]).name;

let reactComponents = {
    ReactIncrement: react2angular(ReactIncrement),
    ReactComp: react2angular(ReactComp)
};

export { angularComponents, reactComponents };
