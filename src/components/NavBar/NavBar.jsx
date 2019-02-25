import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown
} from 'reactstrap';
import { FaGrin } from 'react-icons/fa';

import UserButton from './UserButton';

import auth from '../../services/authService';
import * as signinActions from '../../actions/signin';
import * as topicActions from '../../actions/topic';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: ''
    };
  }

  componentDidMount() {
    const { actionsSign } = this.props;
    const { topic } = this.props.storeTopic;

    const user = auth.getCurrentUser();

    // this.setState(
    //   {
    //     ...this.state,
    //     user: user
    //   },
    //   () => {
    //     actionsSign.signin(user);
    //   }
    // );
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { user } = this.props;
    const { topic } = this.props.storeTopic;
    const topicLink = `/t/${topic}`;
    return (
      <div>
        <Navbar fixed={`top`} sticky={'top'} color="info" light expand="md">
          {/* <NavbarBrand href="/">
            J<FontAwesomeIcon icon="grin-alt" />Y
          </NavbarBrand> */}
          <NavLink
            className="nav-item nav-link"
            style={{ color: 'white', textDecoration: 'none' }}
            activeStyle={{ color: 'white', textDecoration: 'none' }}
            to="/"
          >
            J<FaGrin />Y
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {topic && (
                <NavLink
                  className="nav-item nav-link"
                  style={{ color: 'white', textDecoration: 'none' }}
                  activeStyle={{ color: 'white', textDecoration: 'none' }}
                  to={topicLink}
                >
                  {topic}
                </NavLink>
              )}
              <UncontrolledDropdown nav inNavbar>
                <UserButton user={user} />
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// export default NavBar;
export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopic: state.topic
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopic: bindActionCreators(topicActions, dispatch)
  })
)(NavBar);
