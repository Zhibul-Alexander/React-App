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
  payload: task,
  type: TASKS_ACTIONS.ADD_TASK,
});

export const changeFilter = (event) => ({
  payload: event,
  type: TASKS_ACTIONS.FILTER_TASKS,
});

export const checkRegistration = () => ({
  type: TASKS_ACTIONS.CHECK_REGISTRATION,
});

export const addAdditionTask = (text, id) => ({
  type: TASKS_ACTIONS.ADD_ADDITION_TASK,
  payload: { id: id, text: text },
});

export const logoutApp = () => ({ type: TASKS_ACTIONS.LOGOUT });
