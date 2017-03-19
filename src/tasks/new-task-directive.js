/**
 * New Task Directive:
 * Form to create a new task
 * Usage:
 * <new-task new-task="<variable>" submit="<call to submit function>"</new-task>
 */

export default (tasks) => {
	return tasks.directive('newTask', [() => {

		return {
			templateUrl: 'tasks/new-task.html',
			restrict: 'E',
			scope: {
				submit: '&',
				newTask: '='
			}
		};

	}]);
}
