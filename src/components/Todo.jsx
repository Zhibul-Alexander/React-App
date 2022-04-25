import React from "react";
import { filterOptions, FILTER_STATUSES } from "./constants";
import { CheckboxGroup } from "./common";
import styles from "./styles.module.css";
import {connect} from "react-redux";
import { TASKS_ACTIONS, TasksSelectors, TasksActionSelectors } from "../store";


const filterTasks = (filter, user) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }
    if (filter === FILTER_STATUSES.FULFILLED) {
        return user.isDone;
    }
    return !user.isDone;
}

class TodoOriginal extends React.Component {

    state = {
        taskInput: "",
        filter: FILTER_STATUSES.ALL,
    }

    deleteTaskHandler = (id) => {
        this.props.deleteTask(id);
    }

    inputChangeHandker = (event) => {
        this.setState({ taskInput: event.target.value })
    }

    addTaskHandler = () => {
        this.props.addTasks({label: this.state.taskInput, isDone: false })}

    toggleCheckbox = (id) => {
       this.props.toggleCheckbox(id)
    }

    changeFilterHandler = (event) => {
        this.setState({filter: event.target.value})
    }

    render() { 
        const { taskInput, filter } = this.state;
        const { tasks } = this.props;

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

const mapStateToProps = (state) => {
    return {
        tasks: TasksSelectors.getTasks(state),
    }
}

const mapDispatchToProps = {
    addTasks: TasksActionSelectors.addTasks,
    deleteTask: TasksActionSelectors.deleteTask,
    toggleCheckbox: TasksActionSelectors.toggleCheckbox,
}

export const Todo = connect (mapStateToProps, mapDispatchToProps) (TodoOriginal)
