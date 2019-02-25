import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { FaHome, FaGithub } from 'react-icons/fa';
import urlencode from 'urlencode';
import { Redirect } from 'react-router';

const styles = {
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    // width: 250,
    width: '15rem',
    margin: 10
  },
  media: {
    height: 200
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('[+] TopicInstructorsCard : this = ', this.props.name);
    this.setState({
      clicked: true
    });
  }

  renderPage() {
    const { classes } = this.props;
    const { fullName, name, gitHub, mainUrl, image } = this.props.instructor;
    return (
      <div onClick={this.handleClick}>
        {this.state.clicked ? (
          <Redirect to={`/instructor/${urlencode(name)}`} />
        ) : (
          <MaterialCard className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} name={name} />
              <div className={classes.details}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {fullName ? fullName : name}
                    {'    '}
                    {mainUrl && (
                      <a href={mainUrl}>
                        <FaHome />
                      </a>
                    )}{' '}
                    {gitHub && (
                      <a href={gitHub}>
                        <FaGithub />
                      </a>
                    )}
                  </Typography>
                </CardContent>
              </div>
            </CardActionArea>
          </MaterialCard>
        )}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.instructor && this.renderPage()}
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
