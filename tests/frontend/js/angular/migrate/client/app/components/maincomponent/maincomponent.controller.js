import { reduxComponentInit, reduxComponentDestroy } from "../../reduxMisc";

const MapStateToProps = state => ({
    secretValue: state.secretValue
});

const MapDispatchToProps = null;

class MainController {
    constructor($ngRedux, $scope) {
        let unsubscribe = $ngRedux.connect(MapStateToProps, MapDispatchToProps)(this);
        $scope.$on('$destroy', unsubscribe);
    }
}

MainController.$inject = ['$ngRedux', '$scope'];

export default MainController;
