import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import MaterialIcon, { colorPalette } from 'material-icons-react';
import { FaHome, FaGithub } from 'react-icons/fa';

// 추천수도 보여줄 필요가 있어 보임 (스키마가 바뀔 필요가 있어 보임)
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, course } = this.props;
    return (
      <React.Fragment>
        <h1>Error</h1>
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired
};

export default Card;
