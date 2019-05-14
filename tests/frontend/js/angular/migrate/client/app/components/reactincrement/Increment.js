import React from "react";
import createReactClass from "create-react-class";
import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";
import ActionTypes from "../../actions";

const MapStateToProps = state => ({
    data: state.data
});

const MapDispatchToProps = dispatch => ({
    incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
});

const Increment = createReactClass({
    componentWillMount() {
        reduxComponentInit(this, MapStateToProps, MapDispatchToProps);
    },
    componentWillUnmount() {
        reduxComponentDestroy(this);
    },
    handleClick() {
        this.incrementNumber();
        // TODO embed this into action dispatching
        this.forceUpdate();
    },
    render() {
        const reactStyles = {
            //marginTop: '10px'
        };
        return (
            <div style={reactStyles}>
              <button onClick={this.handleClick}>Increment</button>
              <div>Data has a value of {this.data}</div>
            </div>
        );
    }
});

export default Increment;
