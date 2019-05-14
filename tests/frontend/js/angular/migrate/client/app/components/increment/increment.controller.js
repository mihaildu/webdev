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
    constructor($ngRedux, $scope) {
        let unsubscribe = $ngRedux.connect(MapStateToProps, MapDispatchToProps)(this);
        $scope.$on('$destroy', unsubscribe);
    }
}

IncrementController.$inject = ['$ngRedux', '$scope'];

export default IncrementController;
