import React, { Component } from 'react';

import { KEY_USER } from '../../services/authService';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem(KEY_USER));
    this.setState({
      ...this.state,
      avatar: user ? user.avatar : ''
    });
  }
  render(props) {
    const { width, height } = this.props;
    return this.state.avatar ? (
      <img src={this.state.avatar} alt="avatar" width={width} height={height} />
    ) : null;
  }
}

export default Avatar;
