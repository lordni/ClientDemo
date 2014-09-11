var clientDemo = angular.module('ClientDemo', []);

function mainController($scope, $http) {
	$scope.login = function(){
		$http.post('/login', $scope.formData)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}