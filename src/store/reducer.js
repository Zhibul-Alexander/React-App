import { TASKS_ACTIONS } from "./constants";

const generateId = (tasks) => {
  const ids = tasks.map(({ id }) => id);
  if (ids.length === 0) return 1;
  else return Math.max(...ids) + 1;
};

const INITIAL_STATE = {
  tasks: [
    { id: 1, label: "Освоить JS", isDone: true },
    { id: 2, label: "Освоить React", isDone: true },
    { id: 3, label: "Выполнить todo", isDone: true },
    { id: 4, label: "Оживить todo", isDone: true },
    { id: 5, label: "Выполнить проект на React", isDone: false },
    { id: 6, label: "Найти стажировку / работу", isDone: false },
  ],
};

export const reducer = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
};
