import { createSlice } from "@reduxjs/toolkit";

const generateId = (tasks) => {
  const ids = tasks.map(({ id }) => id);
  if (ids.length === 0) return 1;
  else return Math.max(...ids) + 1;
};

export const { actions, reducer } = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      { id: 1, label: "Освоить JS", isDone: true, addition: "" },
      { id: 2, label: "Освоить React", isDone: true, addition: "" },
      { id: 3, label: "Выполнить todo", isDone: true, addition: "" },
      { id: 4, label: "Оживить todo", isDone: true, addition: "" },
      {
        id: 5,
        label: "Выполнить проект на React",
        isDone: false,
        addition: "",
      },
      {
        id: 6,
        label: "Найти стажировку / работу",
        isDone: false,
        addition: "",
      },
    ],
  },
  reducer: {
    deleteTask: (state, action) => {
      return {
        tasks: state.tasks.filter(
          ({ id: tasksID }) => tasksID !== action.payload
        ),
      };
    },
    addTasks: (state, action) => {
      const id = generateId(state.tasks);
      return {
        tasks: state.tasks.concat({ ...action.payload, id }),
      };
    },
    toggleCheckbox: (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isDone: !task.isDone };
          } else return task;
        }),
      };
    },
    addAdditionTask: (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, addition: action.payload.text };
          }
          return task;
        }),
      };
    },
  },
});
