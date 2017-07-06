// module name + dependencies list
var comp_module = angular.module("comp_app", []);

// now we can add controllers, configs, factories ...

// adding a directive (tag/vocabulary)
comp_module.directive("mytag", mytag_func);

function mytag_func() {
    return {
	// E means must be HTML Element?
	restrict: "E",
	// ng-transclude???
	transclude: true,
	// this means that the element has private attrs??
	scope: {},
	// this specifies the function behavior
	controller: function($scope, $element){

	},
	// this is actually just a pink <p>
	// ng-transclude marks the element where the inner html is inserted
	template: "<p style='color:pink;' ng-transclude></p>",
	// replace <mytag> with template rather than appending
	// does this work?
	replace: false,
    };
}
