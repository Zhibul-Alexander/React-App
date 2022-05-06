import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TasksActionSelectors} from "../../store"; 
import { Link, Route } from "react-router-dom";
import style from "./app.module.css";

export function Registration() {

  const dispatch = useDispatch()
  const checkRegistration = (id) => dispatch(TasksActionSelectors.checkRegistration(id))

  const [login, setLogin] = useState("")
  const [errorLogin, setErrorLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  
  const handleInputLogin = ({ target }) => {
    setLogin(target.value);
  };  
  const handleInputPassword = ({target}) => {
    setPassword(target.value);
  };

  const handleRegistrationBtn = () => {
    if (login.toLowerCase() === process.env.REACT_APP_LOGIN) {
      setErrorLogin("")
    } else {
      setErrorLogin("Неверный логин");
    }
    if (password.toLowerCase() === process.env.REACT_APP_PASSWORD) {
      setErrorPassword("")
    } else {
      setErrorPassword("Неверный логин");
    }
    if (login.toLowerCase() === process.env.REACT_APP_LOGIN && password === process.env.REACT_APP_PASSWORD) {
      checkRegistration()
      
    }
  }

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Регистрация:</h1>
      <form className={style.form}>
        <input className={style.input} placeholder="Login ..." type="text" value={login} onChange={handleInputLogin}/>
        {errorLogin && <span className={style.textError}>{errorLogin}</span>}
        <input className={style.input} placeholder="Password ..." type="password" value={password} onChange={handleInputPassword}/>
        {errorPassword && <span className={style.textError}>{errorPassword}</span>}
        <button className={style.submitBtn} type="button" onClick={handleRegistrationBtn} >Зарегистрироваться</button>
      </form>
    </div>
  );
}
