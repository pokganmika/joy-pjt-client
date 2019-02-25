import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/Form';
import * as userService from '../../services/userService';
import auth from '../../services/authService';
import CommonPaperSheet from '../common/PaperSheet/PaperSheet.jsx';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .min(2)
      .max(50)
      .label('Name')
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <CommonPaperSheet title="Register">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('name', 'Nickname')}
            {this.renderButton('Register')}
          </form>
        </CommonPaperSheet>
      </div>
    );
  }
}

export default RegisterForm;
