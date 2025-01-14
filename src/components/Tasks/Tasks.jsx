import React from "react";
import { filterOptions} from "./constants";
import { CheckboxGroup } from "../common";
import styles from "./styles.module.css";
import {connect} from "react-redux";
import { TasksSelectors, TasksActionSelectors } from "../../store";

class TasksOriginal extends React.Component {

    state = {
        taskInput: "",
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
        this.props.changeFilter(event.target.value);
    }

    render() { 
        const { taskInput } = this.state;
        const { tasks, filter } = this.props;

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
                    {tasks.map(({ id, label, isDone }) => {
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
        filter: TasksSelectors.getFilter(state),
    }
}

const mapDispatchToProps = {
    addTasks: TasksActionSelectors.addTasks,
    deleteTask: TasksActionSelectors.deleteTask,
    toggleCheckbox: TasksActionSelectors.toggleCheckbox,
    changeFilter: TasksActionSelectors.changeFilter,
}

export const Tasks = connect (mapStateToProps, mapDispatchToProps) (TasksOriginal)
