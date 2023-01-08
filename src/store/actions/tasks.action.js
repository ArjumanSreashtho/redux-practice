import {
  TASK_CREATE,
  TASK_RESOLVED,
  TASK_REMOVE,
} from "../actionTypes/tasks.action.type";

export const createTask = (payload) => {
  return {
    type: TASK_CREATE,
    payload,
  };
};

export const taskResolved = (payload) => {
  return {
    type: TASK_RESOLVED,
    payload,
  };
};

export const taskRemoved = (payload) => {
  return {
    type: TASK_REMOVE,
    payload,
  };
};
