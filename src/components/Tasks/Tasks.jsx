import React, { useState } from "react";
import { Link } from "react-router-dom";
import { filterOptions} from "./constants";
import { CheckboxGroup } from "../common";
import styles from "./styles.module.css";
import { TasksSelectors, TasksActionSelectors } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {TasksActions} from "../../store";

export function Tasks() {

    const tasks = useSelector(TasksSelectors.getTasks)
    const filter = useSelector(TasksSelectors.getFilter)

    const dispatch = useDispatch()

    const addTasks = (id) => dispatch(TasksActions.addTasks(id));
    const deleteTask = (id) => dispatch(TasksActions.deleteTask(id));
    const toggleCheckbox = (id) => dispatch(TasksActions.toggleCheckbox(id));
    const changeFilter = (id) => dispatch(TasksActionSelectors.changeFilter(id));

    const [input, setInput] = useState("");

    const deleteTaskHandler = (id) => {
        deleteTask(id);
    }

    const inputChangeHandler = ({target}) => {
        setInput(target.value)
    }

    const addTaskHandler = () => {
        addTasks({label: input, isDone: false })
        setInput("")
    }

    const toggleCheckboxHandler = (id) => {
       toggleCheckbox(id)
    }

    const changeFilterHandler = ({target}) => {
        changeFilter(target.value);
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Todo App</h1>
                <form>
                    <input value={input} onChange={inputChangeHandler} className={styles.headerInput} placeholder="Task ..." />
                    <button onClick={addTaskHandler} type="button" className={styles.headerButton}>Add task</button>
                </form>
                <div className={styles.headerCheckbox}>
                    <CheckboxGroup options={filterOptions} value={filter} onChange={changeFilterHandler}/>
                </div>
            </header>
            <main className={styles.main}>
                {tasks.map(({ id, label, isDone }) => {
                    return (
                        <div className={styles.mainTasks} key={id}>
                            <div> 
                                <input onChange={(() => {
                                toggleCheckboxHandler(id)
                            })} className={styles.mainCheckbox} type="checkbox" checked={isDone} />{`${id}.${label}`}</div>
                            <Link className={styles.link} to={`/tasks/task/${id}`}>Addition</Link>
                            {isDone && <button onClick={() => {
                                deleteTaskHandler(id)
                            }} className={styles.mainButton}>✕</button>}
                        </div>)
                    })}
            </main>
        </div>
    );
}
