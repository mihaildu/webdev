import store from "../../store";
import ActionTypes from "../../actions";
import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";

const MapStateToProps = state => ({
    data: state.data
});

const MapDispatchToProps = dispatch => ({
    incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
});

class IncrementController {
    $onInit() {
        reduxComponentInit(this, MapStateToProps, MapDispatchToProps);
    }
    $onDestroy() {
        reduxComponentDestroy(this);
    }
}

export default IncrementController;
