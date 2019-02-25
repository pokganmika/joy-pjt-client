import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';

import './LoginForm.css';
import SocialLoginButton from './SocialLoginButton';
import Form from '../common/Form';
import auth from '../../services/authService';
import CommonPaperSheet from '../common/PaperSheet/PaperSheet.jsx';

class LoginForm extends Form {
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

  componentDidMount() {}

  doSubmit = async () => {
    const { actionsSign } = this.props;

    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      actionsSign.signin();

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
      <React.Fragment>
        <div className="login">
          <div className="item">
            <h1>Welcome back.</h1>
            <CommonPaperSheet title="">
              <div className="social-login">
                Sign up using :
                <SocialLoginButton social="facebook" />
                <SocialLoginButton social="instagram" />
                <SocialLoginButton social="github" />
                <SocialLoginButton social="google" />
                <SocialLoginButton social="kakao" />
                {/* Now under : now in review by Naver
            <SocialLoginButton social="naver" /> */}
                <br />
              </div>
            </CommonPaperSheet>
          </div>
          <div className="item">
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/joy-learn-image/avatar/undraw_update_uxn2.svg"
              alt="intro"
              width="600"
              style={{ marginLeft: 30, marginTop: 70 }}
            />
          </div>
        </div>
        {/* <div style={{ display: 'flex' }}>
          <h4 style={{ justifyContent: 'center' }}>
            Made with <Emoji symbol="❤️" label="smile" />
          </h4>
        </div> */}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch)
  })
)(LoginForm);
