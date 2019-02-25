import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import http from '../../services/httpService';
// import auth from '../../services/authService';
// import querystring from 'query-string';

import CourseCard from '../Course/Card/Card';
import CommonReview from '../common/Review/Review.jsx';
import CommonComment from '../common/Comment/Comment.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';

// import LectureProfile from '../Lecture/Profile/Profile';
import BarChart from '../common/Chart/Bar/Chart';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';
import * as lectureActions from '../../actions/lecture';
import * as courseActions from '../../actions/course';

import config from '../../config';
const { SERVER_URL } = config();

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {},
      comments: [],
      reviews: []
    };
  }

  static propTypes = {};

  async componentDidMount() {
    const { name } = this.props.name.match.params;
    const { actionLecture } = this.props;

    const { data } = await http.get(`${SERVER_URL}/course/${name}`);
    // console.log('[+] ////////// data = ', data);
    this.setState({
      ...this.state,
      course: data.course,
      reviews: data.reviews,
      comments: data.comments
    });
  }

  _renderPage = () => {};

  render() {
    console.log('where are review : ', this.props);
    // console.log('[+] lecture = ', this.state.lecture);
    // console.log('[+] instrucgtor = ', this.state.instructor);
    const { user } = this.props.storeSignin;
    const { comments, reviews } = this.props.storeCourse;
    const { course } = this.state;

    return (
      <React.Fragment>
        <CourseCard course={course} />

        <DivContainer>
          <DivAverage>
            <PaperSheet title="Reviews Average : ">
              <DivDetail>{`${this.state.course.review} / 5`}</DivDetail>
              {/* {reviews ? (
                <CommonReview
                  type="course"
                  name={course.name}
                  user={user.name}
                  reviews={course.reviews}
                />
              ) : null} */}
              <CommonReview
                type="course"
                name={course.name}
                user={user.name}
                reviews={reviews}
              />
            </PaperSheet>
          </DivAverage>

          <DivChart>
            <BarChart reviews={reviews} />
          </DivChart>
        </DivContainer>

        {/* <PaperSheet title="Review">

          {reviews ? (
            <CommonReview
              type="course"
              name={course.name}
              user={user.name}
              reviews={course.reviews}
            />
          ) : null}

        </PaperSheet> */}
        {comments ? (
          <CommonComment
            type="course"
            name={course.name}
            user={user.name}
            comments={comments}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivAverage = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const DivDetail = styled.div`
  text-align: center;
  font-size: 3rem;
  /* padding: 1rem; */
  /* margin: 1rem; */
  flex-shrink: 0;
`;

const DivChart = styled.div`
  margin: 1rem;
  flex: 2;
  flex-shrink: 1;
  flex-grow: 3;
`;

export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeLecture: state.lecture,
    storeCourse: state.course
  }),
  dispatch => ({
    actionSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionLecture: bindActionCreators(lectureActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(Course);
