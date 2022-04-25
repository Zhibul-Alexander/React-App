import { FILTER_STATUSES } from "../components/Tasks/constants";

export const filterTasks = (filter, task) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.FULFILLED) {
    return task.isDone;
  }

  return !task.isDone;
};

export const getTasksOriginal = (state) => state.tasksReducer.tasks;
export const getFilter = (state) => state.filterReducer.filter;

export const getTasks = (state) => {
  const tasks = getTasksOriginal(state);
  const filter = getFilter(state);

  return tasks.filter((task) => filterTasks(filter, task));
};
