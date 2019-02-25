import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import './Admin.css';
import RegisterForm from '../LoginForm/RegisterForm';
import Form from '../common/Form';
import auth from '../../services/authService';
import CommonPaperSheet from '../common/PaperSheet/PaperSheet.jsx';

class Admin extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <CommonPaperSheet title="Admin : Only for local testing w/o social login.">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </CommonPaperSheet>
        <RegisterForm />
      </div>
    );
  }
}

export default Admin;
