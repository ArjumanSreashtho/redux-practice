import {
  TASKS_LOADING,
  TASKS_RETRIVED,
  TASKS_ERROR,
  TASK_RESOLVED,
  TASK_REMOVE,
  TASK_CREATE,
} from "../actionTypes/tasks.action.type";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export default function taskReducer(tasks = initialState, action) {
  switch (action.type) {
    case TASKS_LOADING:
      return {
        loading: true,
        tasks: tasks.tasks,
        error: "",
      };
    case TASK_CREATE:
      return {
        loading: false,
        tasks: [...tasks.tasks, { ...action.payload }],
        error: "",
      };
    case TASKS_RETRIVED:
      return {
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case TASKS_ERROR:
      return {
        loading: false,
        tasks: tasks.task,
        error: action.payload,
      };
    case TASK_RESOLVED: {
      const updatedTasks = tasks.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.completed = action.payload.completed;
        }
        return task;
      });
      return {
        loading: false,
        tasks: updatedTasks,
        error: "",
      };
    }
    case TASK_REMOVE: {
      const updatedTasks = tasks.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      return {
        loading: false,
        tasks: updatedTasks,
        error: "",
      };
    }
    default:
      return tasks;
  }
}

export const getFilterTaskList = (taskList, filters) => {
  // eslint-disable-next-line
  return taskList.filter((task) => {
    if (
      task.title.toLowerCase().includes(filters.search.trim().toLowerCase())
    ) {
      if (filters.type === "") {
        return task;
      }
      return task.completed === filters.type;
    }
  });
};
