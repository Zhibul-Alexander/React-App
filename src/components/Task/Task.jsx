import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { TasksSelectors, TasksActionSelectors } from "../../store";
import task from "./styles.module.css";


class newTask extends React.Component {
    deleteTaskHandler = (id) => {
        this.props.deleteTask(id);
        this.props.history.push("/tasks");
      };

    toggleCheckbox = (id) => {
        this.props.toggleCheckbox(id);
    };

    textAreaHandler = ({target}) => {
        this.props.addAdditionTask(target.value, Number(this.props.match.params.id));
      };

    render () {
        if (!this.props.getTaskByID(this.props.match.params.id)) {
            return <div className={task.error}>Task:{this.props.match.params.id} doesn't creat</div>;
          }

        const { id, isDone, label, addition } = this.props.getTaskByID(
            this.props.match.params.id);

        return (
            <div className={task.wrapper}>
                <span className={task.task}>{`Task:${id} => ${label}`}</span>
                <div className={task.taskArea}>
                    <input 
                        className={task.checkbox}
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {
                            this.toggleCheckbox(id);
                        }}/>
                    <textarea
                        value={addition}
                        className={task.textarea}
                        placeholder="Add a task ..."
                        onChange={this.textAreaHandler}/>
                    <button className={task.button} onClick={() => {this.deleteTaskHandler(id)}}>
                        ✕
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    getTaskByID: (id) => TasksSelectors.getTaskByID(id)(state),
});

const mapDispatchToProps = {
    addAdditionTask: (text, id) => TasksActionSelectors.addAdditionTask(text, id),
    deleteTask: TasksActionSelectors.deleteTask,
    toggleCheckbox: TasksActionSelectors.toggleCheckbox,
}

export const Task = compose(withRouter ,connect (mapStateToProps, mapDispatchToProps))(newTask)
