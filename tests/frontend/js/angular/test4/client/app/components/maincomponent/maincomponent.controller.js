class MainController {
    constructor($scope) {
        /**
         * passing down data:
         *   pass reference to this.data via prop
         *   store it in scope and child can access it via $parent
         */
        this.data = 100;
        $scope.secretValue = 10;
    }
}

MainController.$inject = ['$scope'];

export default MainController;
