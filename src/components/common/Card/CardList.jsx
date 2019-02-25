import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { FaHome, FaGithub, FaStar } from 'react-icons/fa';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 100,
    margin: 10
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
  },
  media: {
    margin: '30'
  }
});

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false };
  }

  handleClick = e => {
    const { type } = this.props;
    if (
      type === 'instructor' ||
      type === 'lecture' ||
      type === 'book' ||
      type === 'course'
    ) {
      this.setState({
        isClicked: true
      });
    }
  };

  render() {
    const { props } = this;

    const {
      classes,
      title,
      type,
      image,
      url,
      small,
      user,
      time,
      avatar,
      review,
      github
    } = props;

    return (
      <React.Fragment>
        {this.state.isClicked ? (
          <Redirect to={`/${type}/${title}`} />
        ) : (
          <DivCardContainer>
            <Card className={classes.card} onClick={this.handleClick}>
              {image && (
                <CardMedia
                  className={classes.cover}
                  image={image}
                  title={title}
                  style={styles.media}
                />
              )}

              {avatar && (
                <img src={avatar} alt="avatar" width="50" height="50" />
              )}
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  {title && (
                    <Typography component="h6" variant="h6">
                      {title}
                    </Typography>
                  )}

                  {url && (
                    <Typography variant="subtitle1" color="textSecondary">
                      <a href={url}>
                        <FaHome />
                      </a>
                    </Typography>
                  )}

                  {github && (
                    <Typography variant="subtitle1" color="textSecondary">
                      <a href={github}>
                        <FaGithub />
                      </a>
                    </Typography>
                  )}

                  {user && (
                    <Typography variant="subtitle1" color="textSecondary">
                      {user} @ {moment({ time }).fromNow()}
                    </Typography>
                  )}
                  {small && (
                    <Typography component="h6" variant="h6">
                      {small}
                    </Typography>
                  )}
                </CardContent>
              </div>

              <DivPointContainer>
                {review !== 0 && (
                  <Typography component="h5" variant="h5">
                    {review === 5 ? (
                      <React.Fragment>
                        <div style={{ color: 'orange' }}>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </React.Fragment>
                    ) : review === 4 ? (
                      <React.Fragment>
                        <div style={{ color: 'orange' }}>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </React.Fragment>
                    ) : review === 3 ? (
                      <React.Fragment>
                        <div style={{ color: 'orange' }}>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </React.Fragment>
                    ) : review === 2 ? (
                      <React.Fragment>
                        <div style={{ color: 'orange' }}>
                          <FaStar />
                          <FaStar />
                        </div>
                      </React.Fragment>
                    ) : review === 1 ? (
                      <React.Fragment>
                        <div style={{ color: 'orange' }}>
                          <FaStar />
                        </div>
                      </React.Fragment>
                    ) : (
                      review === 0 && null
                    )}
                  </Typography>
                )}
              </DivPointContainer>
            </Card>
          </DivCardContainer>
        )}
      </React.Fragment>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const DivCardContainer = styled.div`
  margin: 1rem;
`;

const DivPointContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default withStyles(styles, { withTheme: true })(CardList);
