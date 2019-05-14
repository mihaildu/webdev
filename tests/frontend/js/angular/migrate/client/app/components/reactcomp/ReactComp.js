import React from "react";
import createReactClass from "create-react-class";

export default createReactClass({
    // props come from a scope
    /* propTypes: { */
    /*     fname: React.PropTypes.string.isRequired, */
    /*     lname: React.PropTypes.string.isRequired */
    /* }, */
    componentDidMount() {
        console.log('react comp mounted');
    },
    render() {
        return (
            <span>
              Hello from React Comp
            </span>
        );
    }
});
