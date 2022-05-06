import { TASKS_ACTIONS } from "./constants";
import { combineReducers } from "redux";
import { FILTER_STATUSES } from "../components/Tasks/constants";
import { reducer as tasksReducer } from "./slice";

const INITIAL_STATE = {
  filter: FILTER_STATUSES.ALL,
  isAuth: false,
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
