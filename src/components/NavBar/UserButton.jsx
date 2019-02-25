import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Avatar from '../Avatar/Avatar';

const UserButton = ({ user }) => {
  return (
    <div>
      {!user && (
        <DropdownToggle nav caret>
          <Button outline color="warning" size="sm">
            Sign Up / Sign In
          </Button>{' '}
        </DropdownToggle>
      )}
      {user && (
        <DropdownToggle nav caret>
          <Button outline color="warning" size="sm">
            {user.name}
          </Button>{' '}
          <Avatar width="30" height="30" />
        </DropdownToggle>
      )}
      <DropdownMenu right>
        <DropdownItem divider />
        {!user && (
          <DropdownItem>
            <NavLink className="nav-item nav-link navbar-right" to="/login">
              Login
            </NavLink>
          </DropdownItem>
        )}

        {user && (
          <DropdownItem>
            <NavLink className="nav-item nav-link navbar-right" to="/setting">
              Setting
            </NavLink>
          </DropdownItem>
        )}
        {user && (
          <DropdownItem>
            <NavLink className="nav-item nav-link navbar-right" to="/logout">
              Sign out
            </NavLink>
          </DropdownItem>
        )}
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
