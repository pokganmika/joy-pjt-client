import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LecturesList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="lecture">
        <Lectureimage image={this.props.image} />
        <h3>{this.props.title}</h3>
        <h1>{this.props.name}</h1>
        <h3>{this.props.instructor}</h3>
        <a>{this.props.url}</a>
        {/* <br /> */}
        <Free free={this.props.free} />
      </div>
    );
  }
}

const Lectureimage = ({ image }) => {
  return <img className="lectureimage" src={image} alt="Lecture" />;
};

const Free = ({ free }) => {
  return free === true ? <h5>free</h5> : <h5>paid</h5>;
};

Lectureimage.propTypes = {
  image: PropTypes.string.isRequired
};

Free.proptypes = {
  free: PropTypes.bool.isRequired
};

export default LecturesList;
