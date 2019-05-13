import store from "../../store";
import ActionTypes from "../../actions";

const MapStateToProps = state => ({
    data: state.data
});

const MapDispatchToProps = dispatch => ({
    incrementNumber() {
        dispatch({type: ActionTypes.INCREMENT_NUMBER});
    }
});

class IncrementController {
    constructor() {
        this.computeComponentState();
        const { incrementNumber } = MapDispatchToProps(store.dispatch);
        this.increment = function() {
            incrementNumber();
        }
    }
    computeComponentState = () => {
        const { data } = MapStateToProps(store.getState());
        if (this.data !== data) {
            this.data = data;
        }
    }
}

export default IncrementController;
