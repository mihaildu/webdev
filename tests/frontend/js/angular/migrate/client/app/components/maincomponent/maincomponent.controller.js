import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";

const MapStateToProps = state => ({
    secretValue: state.secretValue
});

const MapDispatchToProps = null;

class MainController {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
    }
    $onInit() {
        reduxComponentInit(this, MapStateToProps, MapDispatchToProps);
    }
    $onDestroy() {
        reduxComponentDestroy(this);
    }
}

MainController.$inject = ['$rootScope'];

export default MainController;
