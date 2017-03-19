/**
 * Router
 * Routing configuration
 */

export default (app) => {
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	
		$stateProvider.state({
			name: 'tasks',
			url: '/tasks',
			templateUrl: 'tasks/tasks.html',
			controller: 'TasksCtrl'
		});

		$urlRouterProvider.otherwise('/tasks');

	}]);
}
