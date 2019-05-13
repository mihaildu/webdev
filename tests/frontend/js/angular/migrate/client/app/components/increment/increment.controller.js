class IncrementController {
    constructor($scope) {
        this.increment = function() {
            $scope.$parent.secretValue = $scope.$parent.secretValue + 1;
        }
    }
}

IncrementController.$inject = ['$scope'];

export default IncrementController;
