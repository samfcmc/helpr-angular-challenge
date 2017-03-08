let app = angular.module('app', []);

app.run(($rootScope, TaskService) => {
  $rootScope.tasks = TaskService.getTasks();
});

app.factory('TaskService', ($http) => {
  return {
    getTasks() {
      return [
        {
          "id": 0,
          "title": "Go to work",
          "priority": 1
        },
        {
          "id": 1,
          "title": "Go to the gym",
          "priority": 2
        },
        {
          "id": 3,
          "title": "Go to the store",
          "priority": 3
        }
      ]
    }
  };
});

app.controller('AppCtrl', ($scope) => {
  $scope.setPriority = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].priority == 1) {
        tasks[i].priority = "High";
      } else if (tasks[i].priority == 2) {
        tasks[i].priority = "Normal";
      } else if (tasks[i].priority == 3) {
        tasks[i].priority = "Low";
      }
    }
    return tasks;
  };
});

app.controller('TasksCtrl', (TaskService, $rootScope, $scope) => {
  $scope.remove = (task) => {
    for (let i = 0; i < $rootScope.tasks.length ; i++) {
      if (task.id == $rootScope.tasks[i].id) {
        $rootScope.tasks.pop(i);
        return;
      }
    }
  };

  $scope.add = () => {
    $rootScope.tasks.push({title: $scope.task.title, priority: $scope.task.priority || "Normal"});
    $scope.setPriority($rootScope.tasks);
    $scope.task = {};
  };

});

app.controller('ToolsCtrl', (TaskService, $rootScope, $scope) => {
  $scope.clear = () => {
    $rootScope.tasks = [];
  };
});
