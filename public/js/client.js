var clientDemo = angular.module('ClientDemo', []);

function mainController($scope, $http) {

	$scope.login = function(){
		console.log("HEJ!" + $scope.formData.customerId);
	};
}