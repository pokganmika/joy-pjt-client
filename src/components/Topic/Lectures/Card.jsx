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
import { FaHome } from 'react-icons/fa';

import urlencode from 'urlencode';

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

  renderPage() {
    const { classes } = this.props;
    const { name, image, url, lang, free } = this.props.lecture;
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
                    {name}{' '}
                    {url && (
                      <a href={url}>
                        <FaHome />
                      </a>
                    )}
                  </Typography>
                )}
                {/* {lang && lang}
                {free & (free ? 'Free' : 'Paid')}
                {url && <Typography component="p">{url}</Typography>}
                {lang && (
                  <Typography component="p">{`language : ${lang}`}</Typography>
                )}
                {free && (
                  <Typography component="p">
                    {free ? 'Free' : 'Paid'}
                  </Typography>
                )} */}
              </CardContent>
            </CardActionArea>
          </MaterialCard>
        )}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>{this.props.lecture && this.renderPage()}</React.Fragment>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
