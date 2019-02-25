import React from 'react';
import PropTypes from 'prop-types';

const CoursesList = ({ name, period }) => {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{period}</h5>
    </div>
  );
};

CoursesList.propTypes = {
  name: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired
};

export default CoursesList;
