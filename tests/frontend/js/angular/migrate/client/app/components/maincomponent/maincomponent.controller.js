import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";

const MapStateToProps = state => ({
    secretValue: state.secretValue
});

const MapDispatchToProps = null;

class MainController {
    $onInit() {
        reduxComponentInit(this, MapStateToProps, MapDispatchToProps);
    }
    $onDestroy() {
        reduxComponentDestroy(this);
    }
}

export default MainController;
