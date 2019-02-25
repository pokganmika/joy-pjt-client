import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import querystring from 'query-string';

import auth from '../../services/authService';

class Auth extends Component {
  componentDidMount() {
    const values = querystring.parse(this.props.location.search);
    if (values) auth.loginWithJwt(values.token);
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    else return <Redirect to="/login" />;
    // return <h1>Auth</h1>;
    // return <Redirect to="/topics" />;
  }
}

export default Auth;
