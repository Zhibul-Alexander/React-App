import { TASKS_ACTIONS } from "./constants";

export const deleteTask = (id) => ({
  payload: id,
  type: TASKS_ACTIONS.DELETE_TASK,
});

export const toggleCheckbox = (task) => ({
  payload: task,
  type: TASKS_ACTIONS.TOGGLE_CHECKBOX,
});
export const addTasks = (task) => ({
  type: TASKS_ACTIONS.ADD_TASK,
  payload: task,
});
