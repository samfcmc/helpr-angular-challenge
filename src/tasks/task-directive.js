
/**
 * Task Directive.
 * Show a given task
 * Usage:
 * <task task="task"></task>
 */
app.directive('task', [() => {

	return {
		templateUrl: 'tasks/task.html',
		restrict: 'E',
		scope: {
			task: '='
		}
	}

}]);