import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaperSheet from '../../common/PaperSheet/PaperSheet.jsx';

import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const BookCardInner = ({ book, instructor }) => {
  return (
    <ul>
      <li>
        Url : <a href={book.url}>{book.url}</a>
      </li>
      <li>
        Language : <a>{book.lang === 'eng' ? 'English' : 'Korean'}</a>
      </li>
      <ul>
        <li>
          Author :
          <a>{instructor.fullName ? instructor.fullName : instructor.name}</a>
        </li>
        <li>
          Url : <a href={instructor.mainUrl}>{instructor.mainUrl}</a>
        </li>
        <li>
          GitHub : <a href={instructor.gitHub}>{instructor.gitHub}</a>
        </li>
      </ul>
    </ul>
  );
};

const styles = {
  card: {
    width: 150
  },
  media: {
    height: 150
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { book, instructor, classes } = this.props;
    return (
      <React.Fragment>
        <PaperSheet title={book.name}>
          <DivContainer>
            <MaterialCard className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={book.image} />
              </CardActionArea>
            </MaterialCard>
            <BookCardInner book={book} instructor={instructor} />
          </DivContainer>
        </PaperSheet>
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default withStyles(styles)(Card);
