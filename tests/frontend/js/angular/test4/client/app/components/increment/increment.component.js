import template from './increment.html';
import controller from './increment.controller';
import './increment.scss';

let incrementComponent = {
    bindings: {
        // one way binding
        data: '<',
    },
    template,
    controller
};

export default incrementComponent;
