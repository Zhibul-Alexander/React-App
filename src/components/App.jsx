import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Tasks } from "./Tasks";
import {Registration} from "./Registration";
import { TasksSelectors, logoutApp } from "../store";
import {About} from "./About";
import { Task } from "./Task";
import "./index.css";
import app from "./style.module.css"; 

export function App() {

    const checkRegistration = useSelector(TasksSelectors.checkRegistration) 
    // const tasks = useSelector(TasksSelectors.getTasks) 

    const dispatch = useDispatch()

    const logout = () => dispatch(logoutApp())

    const history = useHistory()

    const [searchInput, setSearchInput] = useState("")


    const logoutBtnHandler = () => {
        logout();
      };

    const inputChangeHandler = ({target}) => {
        setSearchInput(target.value);
      };

    const searchBtnHandler = ()=>{
        history.push(`/tasks/task/${searchInput}`)
      }

      return (
          
          <div className={app.wrapper}>
              <header className={app.header}>
                  <Link className={app.link} to="/tasks">To do tasks</Link>
                  <Link className={app.link} to="/about">About</Link>
                  <div>
                      <input className={app.input} onChange={inputChangeHandler} value={searchInput} placeholder='Write a task number ...'/>
                      <button className={app.button} onClick={searchBtnHandler}>Search</button>
                  </div>
                  {checkRegistration && (<Link className={app.link} onClick={logoutBtnHandler}>Logout</Link>)}
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

