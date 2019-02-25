import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';

/*
const styles = {
  card: {
    width: 250,
    margin: 10
  },
  media: {
    height: 90
  }
};
*/

const styles = theme => ({
  card: {
    display: 'flex',
    margin: 10
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto',
    width: 170
  },
  cover: {
    width: 59,
    margin: 5
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class CardTopic extends Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true
    });
  }

  /*
        <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/t/${title}`} />
        ) : (
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={image}
                title={title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </div>
  */

  render() {
    const { classes, image, title } = this.props;
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/t/${title}`} />
        ) : (
          <Card className={classes.card}>
            <CardMedia className={classes.cover} image={image} title={title} />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {title}
                </Typography>
              </CardContent>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

CardTopic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardTopic);
