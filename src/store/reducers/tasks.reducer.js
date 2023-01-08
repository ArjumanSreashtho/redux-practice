import {
  TASK_CREATE,
  TASK_RESOLVED,
  TASK_REMOVE,
} from "../actionTypes/tasks.action.type";

const initialState = [];

let taskId = 0;

export default function taskReducer(tasks = initialState, action) {
  switch (action.type) {
    case TASK_CREATE:
      return [...tasks, { ...action.payload, id: ++taskId, resolved: false }];

    case TASK_RESOLVED:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    case TASK_REMOVE:
      return tasks.filter((task) => task.id !== action.payload.id);
    default:
      return tasks;
  }
}
