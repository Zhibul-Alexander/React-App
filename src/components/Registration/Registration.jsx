import React from "react";
import { connect } from "react-redux";
import { TasksSelectors, TasksActionSelectors} from "../../store"; 
import { checkRegistration } from "../../store/actionsCreators";
import style from "./app.module.css";

export class newRegistration extends React.Component {
  state = {
    login: "",
    password: "",
    errorLogin: "",
    errorPassword: "",
  };
  
  handleInputLogin = ({ target }) => {
    this.setState({ login: target.value });
  };
  handleInputPassword = ({target}) => {
    this.setState({ password: target.value });
  };

  handleRegistrationBtn = () => {
    if (this.state.login.toLowerCase() === process.env.REACT_APP_LOGIN) {
      this.setState({ errorLogin: "" });
    } else {
      this.setState({ errorLogin: "Неверный логин" });
    }
    if (this.state.password.toLowerCase() === process.env.REACT_APP_PASSWORD) {
      this.setState({ errorPassword: "" });
    } else {
      this.setState({ errorPassword: "Неверный пароль" });
    }
    if (this.state.login.toLowerCase() === process.env.REACT_APP_LOGIN && this.state.password === process.env.REACT_APP_PASSWORD) {
      this.props.checkRegistration()
    }
  }

  render() {
    const {
      login,
      password,
      errorLogin,
      errorPassword,
    } = this.state;

    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>Регистрация:</h1>
        <form className={style.form}>
          <input className={style.input} placeholder="Login ..." type="text" value={login} onChange={this.handleInputLogin}/>
          {errorLogin && <span className={style.textError}>{errorLogin}</span>}
          <input className={style.input} placeholder="Password ..." type="password" value={password} onChange={this.handleInputPassword}/>
          {errorPassword && <span className={style.textError}>{errorPassword}</span>}
          <button className={style.submitBtn} type="button" onClick={this.handleRegistrationBtn} >Зарегистрироваться</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkRegistration: TasksSelectors.checkRegistration(state),
  };
};

const mapDispatchToProps = {
  checkRegistration: TasksActionSelectors.checkRegistration,
};

export const Registration = connect(
  mapStateToProps,
  mapDispatchToProps)(newRegistration);
