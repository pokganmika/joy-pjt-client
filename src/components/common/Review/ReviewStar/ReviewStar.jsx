import React, { Component } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CommonPaperSheet from '../../../common/PaperSheet/PaperSheet.jsx';
import http, { SERVER_URL } from '../../../../services/httpService.js';
import StarRatingComponent from 'react-star-rating-component';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as instructorActions from '../../../../actions/instructor';
import * as lectureActions from '../../../../actions/lecture';
import * as bookActions from '../../../../actions/book';
import * as courseActions from '../../../../actions/course';
import './ReviewStar.css';

class ReviewStar extends Component {
  constructor(props) {
    super(props);

    this.state = { cSelected: [], rating: 0 };

    this.onStarClick = this.onStarClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleClick = async e => {
    const {
      type,
      user,
      actionInstructor,
      actionLecture,
      actionBook,
      actionCourse
    } = this.props;

    const name = decodeURIComponent(this.props.name);
    let apiEndpoint = `${SERVER_URL}/api/review/${type}/${name}`;

    const { data: reviews } = await http.post(apiEndpoint, {
      writer: user,
      review: this.state.rating
    });

    console.log('[+] /////////// ReviewStart clicked', type);

    if (type === 'instructor') {
      actionInstructor.add_reviews(reviews);
    } else if (type === 'lecture') {
      actionLecture.add_reviews(reviews);
    } else if (type === 'book') {
      actionBook.add_reviews(reviews);
    } else if (type === 'course') {
      actionCourse.add_reviews(reviews);
    }
  };

  render() {
    const { rating } = this.state;
    return (
      <div className="rating-stars">
        <CommonPaperSheet /*title="Share your review with others :"*/>
          <DivReview>
            <span>Share your review with others : </span>
          </DivReview>
          <br />
          <br />
          <DivStarRaing>
            <StarRatingComponent
              className="star-rating"
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </DivStarRaing>
          <p />
          <Button color="primary" block onClick={this.handleClick}>
            Submit : {this.state.rSelected}
          </Button>
        </CommonPaperSheet>
      </div>
    );
  }
}

const DivReview = styled.div`
  font-size: 1rem;
`;

const DivStarRaing = styled.div`
  /* margin-left: 12px; */
  font-size: 30px;
`;

export default connect(
  state => ({
    storeInstructor: state.instructor,
    storeCourse: state.course
  }),
  dispatch => ({
    actionInstructor: bindActionCreators(instructorActions, dispatch),
    actionLecture: bindActionCreators(lectureActions, dispatch),
    actionBook: bindActionCreators(bookActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(ReviewStar);
