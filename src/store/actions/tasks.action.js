import axios from "axios";
import { toast } from "react-toastify";
import {
  TASK_CREATE,
  TASK_RESOLVED,
  TASK_REMOVE,
  TASKS_LOADING,
  TASKS_RETRIVED,
  TASKS_ERROR,
} from "../actionTypes/tasks.action.type";

export const createTask = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TASKS_LOADING });
      const { data: newTask } = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { ...payload, completed: false }
      );
      toast.info("New task has been added");
      dispatch({ type: TASK_CREATE, payload: newTask });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: TASKS_ERROR, payload: error.message });
    }
  };
};

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TASKS_LOADING });
      const { data: tasks } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      dispatch({ type: TASKS_RETRIVED, payload: tasks });
    } catch (error) {
      dispatch({ type: TASKS_ERROR, payload: error.message });
    }
  };
};

export const taskResolved = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TASKS_LOADING });
      const { data: updatedTask } = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
        payload
      );
      toast.info("Task has been updated");
      dispatch({ type: TASK_RESOLVED, payload: updatedTask });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: TASKS_ERROR, error: error.message });
    }
  };
};

export const taskRemoved = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TASKS_LOADING });
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`
      );
      toast.info("Task has been deleted");
      dispatch({ type: TASK_REMOVE, payload });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: TASKS_ERROR, payload: error.message });
    }
  };
};
