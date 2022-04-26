import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { Tasks } from "./Tasks";
import {Registration} from "./Registration";
import { TasksSelectors, logoutApp } from "../store";
import {About} from "./About";
import "./index.css";
import app from "./style.module.css";

export class newApp extends React.Component {

    logoutBtnHandler = () => {
        this.props.logout();
      };

    render () {
        const { checkRegistration } = this.props;
        return (
            
            <div className={app.wrapper}>
                <header className={app.header}>
                    <Link className={app.link} to="/tasks">To do tasks</Link>
                    <Link className={app.link} to="/about">About</Link>
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
