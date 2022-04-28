import { TASKS_ACTIONS } from "./constants";
import { combineReducers } from "redux";
import { FILTER_STATUSES } from "../components/Tasks/constants";

const generateId = (tasks) => {
  const ids = tasks.map(({ id }) => id);
  if (ids.length === 0) return 1;
  else return Math.max(...ids) + 1;
};

const INITIAL_STATE = {
  tasks: [
    { id: 1, label: "Освоить JS", isDone: true, addition: "" },
    { id: 2, label: "Освоить React", isDone: true, addition: "" },
    { id: 3, label: "Выполнить todo", isDone: true, addition: "" },
    { id: 4, label: "Оживить todo", isDone: true, addition: "" },
    { id: 5, label: "Выполнить проект на React", isDone: false, addition: "" },
    { id: 6, label: "Найти стажировку / работу", isDone: false, addition: "" },
  ],
  filter: FILTER_STATUSES.ALL,
  isAuth: false,
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.DELETE_TASK: {
      return {
        tasks: state.tasks.filter(
          ({ id: tasksID }) => tasksID !== action.payload
        ),
      };
    }
    case TASKS_ACTIONS.TOGGLE_CHECKBOX: {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isDone: !task.isDone };
          } else return task;
        }),
      };
    }
    case TASKS_ACTIONS.ADD_TASK: {
      const id = generateId(state.tasks);
      return {
        tasks: state.tasks.concat({ ...action.payload, id }),
      };
    }
    case TASKS_ACTIONS.ADD_ADDITION_TASK: {
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, addition: action.payload.text };
          }
          return task;
        }),
      };
    }
    default:
      return state;
  }
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.FILTER_TASKS: {
      return {
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

export const registrationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.CHECK_REGISTRATION: {
      return {
        isAuth: true,
      };
    }
    case TASKS_ACTIONS.LOGOUT: {
      return {
        isAuth: false,
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasksReducer,
  filterReducer,
  registrationReducer,
});
