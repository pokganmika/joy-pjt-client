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
// import { Redirect } from 'react-router';

const styles = {
  card: {
    width: 250,
    margin: 10
  },
  media: {
    height: 300
  }
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, tname } = this.props;
    const { name, image, url, free, lang } = this.props.lecture;
    return (
      <MaterialCard className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">{tname}</Typography>
          </CardContent>
        </CardActionArea>
      </MaterialCard>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
