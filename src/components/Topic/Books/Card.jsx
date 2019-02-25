import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import urlencode from 'urlencode';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FaHome } from 'react-icons/fa';

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
    const { name, image, url, lang, free } = this.props.book;
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/book/${urlencode(name)}`} />
        ) : (
          <MaterialCard className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} title={name} />
              <CardContent>
                {name && (
                  <Typography gutterBottom variant="h6" component="h6">
                    {name}
                    {'   '}
                    {url && (
                      <a href={url}>
                        <FaHome />
                      </a>
                    )}
                  </Typography>
                )}
                {/* {url && <Typography component="p">{url}</Typography>}
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
    // const { classes, name, image, url, lang, free } = this.props;

    return (
      <React.Fragment>{this.props.book && this.renderPage()}</React.Fragment>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
