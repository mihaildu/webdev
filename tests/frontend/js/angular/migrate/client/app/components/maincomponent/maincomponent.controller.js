import store from "../../store";

const MapStateToProps = state => ({
    secretValue: state.secretValue
});

const MapDispatchToProps = null;

class MainController {
    constructor() {
        this.computeComponentState();
        store.subscribe(this.computeComponentState);
    }
    // TODO this function is the same for each component
    // write it at a higher level/in common (e.g. component init)
    // component.componentInit(MapStateToProps)
    computeComponentState = () => {
        const { secretValue } = MapStateToProps(store.getState());
        if (this.secretValue !== secretValue) {
            this.secretValue = secretValue;
        }
    }
}

export default MainController;
