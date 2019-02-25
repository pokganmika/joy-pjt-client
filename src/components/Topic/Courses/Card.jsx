import React, { Component } from 'react';
import PropTypes from 'prop-types';

import urlencode from 'urlencode';
import { Redirect } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// 추천수도 보여줄 필요가 있어 보임 (스키마가 바뀔 필요가 있어 보임)
class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('[+] TopicCourseCard : this = ', this.props.name);
    this.setState({
      clicked: true
    });
  }

  renderPage() {
    const { classes } = this.props;
    const { name, image, courses } = this.props.course;
    console.log(name, image, courses);
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/course/${urlencode(name)}`} />
        ) : (
          <MaterialCard className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} name={name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </MaterialCard>
        )}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>{this.props.course && this.renderPage()}</React.Fragment>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired
};

const styles = {
  card: {
    // width: 250,
    width: 400,
    margin: 10
  },
  media: {
    height: 150
  }
};

// export default Card;
export default withStyles(styles)(Card);
