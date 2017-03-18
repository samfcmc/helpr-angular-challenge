/**
 * New Task Directive:
 * Form to create a new task
 */

app.directive('newTask', [() => {

	return {
		templateUrl: 'tasks/new-task.html',
		restrict: 'E',
		//TODO: Change this to ES6
		link: function(scope, element, attributes) {
			let submitButton = element.find('submit');
			let submitBehavior = attributes.submit;
			scope.$newTask = {};
			if(submitBehavior) {
				submitButton.on('click', (event) => {
					event.preventDefault();
					if(scope.$newTask) {
						scope.$apply(submitBehavior);
					}
				});
			}
		}
	};

}]);