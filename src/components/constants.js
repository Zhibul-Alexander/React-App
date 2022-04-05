export const tasks = [
    { id: 1, label: "Выучить JS", isDone: true },
    { id: 2, label: "Выучить React", isDone: false },
    { id: 3, label: "Сделать todo", isDone: true },
    { id: 4, label: "Оживить todo", isDone: false },
    { id: 5, label: "Выполнить проект на React", isDone: false },
    { id: 6, label: "Найти стажировку/работу", isDone: false },
];

export const FILTER_STATUSES = {
    ALL: 'All',
    FULFILLED: 'Fulfilled',
    UNFULFILLED: 'Unfulfilled',
  }

export const filterOptions = [
    { value: FILTER_STATUSES.ALL, label: 'All' },
    { value: FILTER_STATUSES.FULFILLED, label: 'Fulfilled' },
    { value: FILTER_STATUSES.UNFULFILLED, label: 'Unfulfilled' },
];
