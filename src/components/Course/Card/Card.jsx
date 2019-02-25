import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaperSheet from '../../common/PaperSheet/PaperSheet';

import CourseRender from '../CourseRender/CourseRender.jsx';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialCard } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const CourseCardInner = ({ course }) => {
  return (
    <ul>
      <li>course.name</li>
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
    const { classes, course } = this.props;
    console.log('[+] /////  CourseCard = ', course);

    return (
      <React.Fragment>
        {course && (
          <CourseRender name={course.name} course={course} review="" />
        )}
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
