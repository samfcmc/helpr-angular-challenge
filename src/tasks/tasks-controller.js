/**
 * Tasks controller
 * Handles a list of tasks
 */

export default (tasks) => {
	return tasks.controller('TasksCtrl', ['TaskService', '$scope', function(TaskService, $scope) {
	
		$scope.tasks = [];

		const DEFAULT_PRIORITY = 2;

		$scope.init = () => {
			$scope.tasks = TaskService.getTasks();
		};

		/**
		 * Remove a given task from the tasks list
		 */
		$scope.remove = (task) => {
			for (let i = 0; i < $scope.tasks.length ; i++) {
				if (task.id == $scope.tasks[i].id) {
					$scope.tasks.pop(i);
					return;
				}
			}
		};
		
		/**
		 * Add a new task
		 */
		$scope.add = (task) => {
			$scope.tasks.push({title: task.title, priority: task.priority || DEFAULT_PRIORITY});
			$scope.newTask = {};
		};
		
		/**
		 * Clear the tasks list
		 */
		$scope.clear = () => {
			$scope.tasks = [];
		};

		$scope.init();
	}]);
}
