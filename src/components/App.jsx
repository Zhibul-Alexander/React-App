import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { Tasks } from "./Tasks";
import {Registration} from "./Registration";
import { TasksSelectors, logoutApp } from "../store";
import {About} from "./About";
import { Task } from "./Task";
import "./index.css";
import app from "./style.module.css";

export class newApp extends React.Component {
    state ={
        searchInput: '',
      }

    logoutBtnHandler = () => {
        this.props.logout();
      };

    inputChangeHandler = ({target}) => {
        this.setState({ searchInput: target.value });
      };

    searchBtnHandler = ()=>{
        this.props.history.push(`/tasks/task/${this.state.searchInput}`)
      }

    render () {
        const { searchInput } = this.state;
        const { checkRegistration } = this.props;
        return (
            
            <div className={app.wrapper}>
                <header className={app.header}>
                    <Link className={app.link} to="/tasks">To do tasks</Link>
                    <Link className={app.link} to="/about">About</Link>
                    <div>
                        <input className={app.input} onChange={this.inputChangeHandler} value={searchInput} placeholder='Write a task number ...'/>
                        <button className={app.button} onClick={this.searchBtnHandler}>Search</button>
                    </div>
                    {checkRegistration && (<Link className={app.link} onClick={this.logoutBtnHandler}>Logout</Link>)}
                </header>
                
                <div className={app.border}>
                    <Switch>
                        <Route path="/register" exact>
                            <Registration />
                        </Route>
                        {!checkRegistration && <Redirect to="/register" />}
                        <Route path="/tasks" exact>
                            <Tasks />
                        </Route>
                        <Route path="/about" exact>
                            <About />
                        </Route>
                        <Route path="/tasks/task/:id" exact>
                            <Task />
                        </Route>
                        <Redirect to="/tasks" />
                    </Switch>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        checkRegistration: TasksSelectors.checkRegistration(state),
        tasks: TasksSelectors.getTasks(state),
    };
  };

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutApp()),
  });
  
  export const App = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(newApp);
