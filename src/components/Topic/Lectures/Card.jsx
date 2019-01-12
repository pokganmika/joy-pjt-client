import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import MaterialIcon, { colorPalette } from 'material-icons-react';
import { Redirect } from 'react-router';

import urlencode from 'urlencode';

const styles = {
  card: {
    // width: 250,
    width: 350,
    margin: 10
  },
  media: {
    height: 300
  }
};

class Card extends Component {
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

  render() {
    console.log('card props : ', this.props);
    const { classes, name, image, url, lang, free } = this.props;
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/lecture/${urlencode(name)}`} />
        ) : (
          <MaterialCard className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} title={name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography component="p">{url}</Typography>
                <Typography component="p">{`language : ${lang}`}</Typography>
                <Typography component="p">{free ? 'Free' : 'Paid'}</Typography>
              </CardContent>
            </CardActionArea>
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