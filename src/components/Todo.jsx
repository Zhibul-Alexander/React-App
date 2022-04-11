import React from "react";
import { filterOptions, FILTER_STATUSES } from "./constants";
import { CheckboxGroup } from "./common";
import styles from "./styles.module.css";

const filterTasks = (filter, user) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }
    if (filter === FILTER_STATUSES.FULFILLED) {
        return user.isDone;
    }
    return !user.isDone;
}

const generateId = (tasks) => {
    const ids = tasks.map(({ id }) => id);
    if (ids.length === 0) return 1;
    else return Math.max(...ids) + 1;
}

export class Todo extends React.Component {

    state = {
        tasks: [
            { id: 1, label: "Освоить JS", isDone: true },
            { id: 2, label: "Освоить React", isDone: true },
            { id: 3, label: "Выполнить todo", isDone: true },
            { id: 4, label: "Оживить todo", isDone: true },
            { id: 5, label: "Выполнить проект на React", isDone: false },
            { id: 6, label: "Найти стажировку / работу", isDone: false },
        ],
        taskInput: "",
        filter: FILTER_STATUSES.ALL,
    }

    deleteTaskHandler = (id) => {
        this.setState((prevState) => (
            {tasks: prevState.tasks.filter(({ id: tasksID }) => tasksID !== id)}))
    }

    inputChangeHandker = (event) => {
        this.setState({ taskInput: event.target.value })
    }

    addTaskHandler = () => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.concat(
                [{ id: generateId(prevState.tasks), label: prevState.taskInput, isDone: false }]
            ), taskInput: ""
        }))
    }

    toggleCheckbox = (id) => {
       this.setState((prevState) => ({
           tasks: prevState.tasks.map((task) => {
               if (task.id === id) {
                   return { ...task, isDone: !task.isDone }
               }
               else return task 
           })
       }))
    }

    changeFilterHandler = (event) => {
        this.setState({filter: event.target.value})
    }

    render() {
        const { tasks, taskInput, filter } = this.state;

        return (
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h1 className={styles.headerTitle}>Todo App</h1>
                    <form>
                        <input value={taskInput} onChange={this.inputChangeHandker} className={styles.headerInput} placeholder="Task ..." />
                        <button onClick={this.addTaskHandler} type="button" className={styles.headerButton}>Add task</button>
                    </form>
                    <div className={styles.headerCheckbox}>
                        <CheckboxGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler}/>
                    </div>
                </header>
                <main className={styles.main}>
                    {tasks.filter((task) => filterTasks(filter, task)).map(({ id, label, isDone }) => {
                        return (
                            <div className={styles.mainTasks} key={id}>
                                <div><input onChange={(() => {
                                    this.toggleCheckbox(id)
                                })} className={styles.mainCheckbox} type="checkbox" checked={isDone} />{label}</div>
                                {isDone && <button onClick={() => {
                                    this.deleteTaskHandler(id)
                                }} className={styles.mainButton}>✕</button>}
                            </div>)
                    })}
                </main>
            </div>
        );
    };
}
