import React from 'react';
import {
  GithubLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
  InstagramLoginButton
} from 'react-social-login-buttons';

import auth from '../../services/authService';
import config from '../../config';
const { SERVER_URL } = config();

const SocialLoginButton = ({ social }) => {
  const urlSocialAuth = `${SERVER_URL}/auth/${social}`;
  let Button;
  switch (social) {
    case 'github':
      Button = <GithubLoginButton onClick={() => auth.loginSocial(social)} />;
      break;
    case 'facebook':
      Button = <FacebookLoginButton onClick={() => auth.loginSocial(social)} />;
      break;
    case 'google':
      Button = <GoogleLoginButton onClick={() => auth.loginSocial(social)} />;
      break;
    case 'instagram':
      Button = (
        <InstagramLoginButton onClick={() => auth.loginSocial(social)} />
      );
      break;
    case 'kakao':
      Button = (
        <a href={urlSocialAuth}>
          <img
            src={require('./img/kakao_account_login_btn_medium_wide.png')}
            alt="loginKakaoButton"
            onClick={() => auth.loginSocial('kakao')}
          />
        </a>
      );
      break;
    case 'naver':
      Button = (
        <a href={urlSocialAuth}>
          <img
            src={require('./img/naver_login.png')}
            alt="loginNaverButton"
            onClick={() => auth.loginSocial('naver')}
          />
        </a>
      );
      break;
    default:
      break;
  }

  // return <div className="container-social">{Button}</div>;
  return (
    <div className="container-social">
      <a href={urlSocialAuth}>{Button}</a>
    </div>
  );
};

export default SocialLoginButton;
