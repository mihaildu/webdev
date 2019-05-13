import store from "../../store";

const MapStateToProps = state => ({
    data: state.data,
    secretValue: state.secretValue
});

const MapDispatchToProps = null;

class MainController {
    constructor($scope) {
        const { data, secretValue } = MapStateToProps(store.getState());
        this.data = data;
        $scope.secretValue = secretValue;
    }
}

MainController.$inject = ['$scope'];

export default MainController;
