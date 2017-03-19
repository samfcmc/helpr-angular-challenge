/**
 * Task Service:
 * Handles Tasks CRUD operations
 */

export default (tasks) => {
  return tasks.factory('TaskService', ['$http', ($http) => {
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
  }]);
}
