import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';
import NavigationIcon from '@material-ui/icons/Navigation';

import urlencode from 'urlencode';

const styles = {
  card: {
    width: 600,
    margin: 10
  },
  media: {
    height: 100
  }
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    this.setState({
      clicked: true
    });
    console.log(name);
  }

  render() {
    const { classes, image, name } = this.props;
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/lecture/${urlencode(name)}`} />
        ) : (
          <MaterialCard className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} title={name} />
              <CardContent>
                {name && (
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="Add"
                className={classes.margin}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Recommend
              </Fab>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </MaterialCard>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
