
/**
 * Task Directive.
 * Show a given task
 * Usage:
 * <task task="task"></task>
 */

export default (tasks) => {
	
	return tasks.directive('task', [() => {

		return {
			templateUrl: 'tasks/task.html',
			restrict: 'E',
			scope: {
				task: '=',
				remove: '&'
			}
		}

	}]);
}
