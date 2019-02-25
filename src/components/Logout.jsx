import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../actions/signin';
import auth from '../services/authService';

class Logout extends Component {
  componentDidMount = () => {
    const { signinActions } = this.props;
    auth.logout();
    signinActions.signout();
    window.location = '/';
  };

  render() {
    return null;
  }
}

export default connect(
  state => ({
    // TODO: How store state is linked to this ?
    signin: state.signin
  }),
  dispatch => ({
    signinActions: bindActionCreators(signinActions, dispatch)
  })
)(Logout);
