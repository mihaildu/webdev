import React from "react";
import createReactClass from "create-react-class";

import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";
import ActionTypes from "../../actions";
import { connect } from "../../store";

const MapStateToProps = state => ({
    data: state.data,
    secretValue: state.secretValue
});

const MapDispatchToProps = dispatch => ({
    incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
});

class NewIncrement extends React.Component {
    render() {
        const { data, secretValue } = this.props;
        return (
            <div>
              <button onClick={() => this.props.incrementNumber()}>Increment</button>
              <div>Data has a value of {data}</div>
              <div>Secret value {secretValue}</div>
            </div>
        );
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(NewIncrement);
