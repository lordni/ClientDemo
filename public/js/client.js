var clientDemo = angular.module('ClientDemo', []);

function mainController($scope, $http) {
	$scope.login = function(){
		$http.post('/login', $scope.formData)
			.success(function(data) {
				$scope.failingPassword = false;
				console.log(data);
			})
			.error(function(data) {
				$scope.failingPassword = true;
				console.log('Error: ' + data);
			});
	};
}