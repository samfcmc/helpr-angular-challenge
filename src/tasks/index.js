/**
 * Tasks Module
 */

let tasks = angular.module('tasks', []);

import tasksController from './tasks-controller';
import taskService from './task-service';
import taskDirective from './task-directive';
import newTaskDirective from './new-task-directive';
import priorityFilter from './priority-filter';

export default {
	module: tasks,
	services: {
		task: taskService(tasks)
	},
	controllers: {
		tasks: tasksController(tasks)
	},
	directives: {
		task: taskDirective(tasks),
		newTask: newTaskDirective(tasks)
	},
	filters: {
		priority: priorityFilter(tasks)
	}
}

