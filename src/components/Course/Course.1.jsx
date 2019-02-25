import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
// import Loader from 'react-loader-spinner';

import http from '../../services/httpService';

import CourseCard from '../Course/Card/Card';
import CommonReview from '../common/Review/Review.jsx';
import CommonComment from '../common/Comment/Comment.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';
import BarChart from '../common/Chart/Bar/Chart';
import urlencode from 'urlencode';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';
import * as courseActions from '../../actions/course';

import config from '../../config';
const { SERVER_URL } = config();

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {},
      instructor: {},
      comments: [],
      reviews: []
    };
  }

  static propTypes = {};

  async componentDidMount() {
    const { name } = this.props.name.match.params;
    const { actionCourse } = this.props;

    const { data } = await http.get(`${SERVER_URL}/course/${urlencode(name)}`);
    this.setState(
      {
        ...this.state,
        course: data.course[0],
        instructor: data.instructor[0],
        reviews: data.reviews,
        comments: data.comments
      },
      () => {
        actionCourse.set_all(this.state);
      }
    );
  }

  _renderPage = () => {};

  render() {
    const { user } = this.props.storeSignin;
    const { comments, reviews } = this.props.storeCourse;
    const { course, instructor } = this.state;

    return (
      <React.Fragment>
        <CourseCard course={course} instructor={instructor} />
        <DivContainer>
          <DivAverage>
            <PaperSheet title="Reviews Average">
              <DivDetail>{`${course.review} / 5`}</DivDetail>
            </PaperSheet>
          </DivAverage>

          <DivChart>
            <BarChart reviews={reviews} />
          </DivChart>
        </DivContainer>
        {/* <PaperSheet title="Lecture : ">
          <DivContainer>
            <DivProfileChart>
              {this.state.lecture ? (
                <LectureProfile
                  lecture={this.state.lecture}
                  tname={this.state.instructor.name}
                />
              ) : null}
              <LecturePie />
            </DivProfileChart>
          </DivContainer>
        </PaperSheet> */}
        <PaperSheet title="Review">
          {reviews ? (
            <CommonReview
              type="course"
              name={course.name}
              user={user.name}
              reviews={reviews}
            />
          ) : null}
        </PaperSheet>

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

//       <React.Fragment>
//         {this.state.lecture && this.state.instructor ? (
//           this._renderPage()
//         ) : (
//           <DivSpinner>
//             <Loader type="Triangle" color="#00BFFF" height="200" width="200" />
//           </DivSpinner>
//         )}
//         {/* <LectureBar /> */}
// {/* <LectureComments /> */ }
//       </React.Fragment >

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivAverage = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const DivDetail = styled.div`
  font-size: 3rem;
  padding: 1rem;
  margin: 1rem;
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
    storeCourse: state.course
  }),
  dispatch => ({
    actionSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(Course);
