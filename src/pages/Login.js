import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      load: false,
      redirect: false,
    };
  }

  handleText = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validate());
  }

  validate = () => {
    const { name } = this.state;
    const MIN_LEN_USER = 3;
    if (name.length >= MIN_LEN_USER) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  // Solução encontra na branch de Tomas Breuckmann
  // (https://github.com/tryber/sd-019-a-project-trybetunes/blob/tomas-breuckmann-project-trybetunes/src/pages/Login.js)
  submitForm = (e) => {
    e.preventDefault();
    this.backCreateUser();
  }

  async backCreateUser() {
    this.setState(
      { load: true,
        redirect: false },
      async () => {
        const { name } = this.state;
        await createUser({ name });
        this.setState({
          load: true,
          redirect: true,
        });
      },
    );
  }

  render() {
    const { disabled, name, load, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form onSubmit={ this.submitForm }>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleText }
            name="name"
            placeholder="Digite seu nome"
            value={ name }
          />
          <button
            name="button-login"
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
        { load && <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
