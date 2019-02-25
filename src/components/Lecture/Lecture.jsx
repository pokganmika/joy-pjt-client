import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import http from '../../services/httpService';
// import auth from '../../services/authService';
// import querystring from 'query-string';

import LectureCard from '../Lecture/Card/Card';
import CommonReview from '../common/Review/Review.jsx';
import CommonComment from '../common/Comment/Comment.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';
// import LectureProfile from '../Lecture/Profile/Profile';
import BarChart from '../common/Chart/Bar/Chart';
// import LecturePie from '../Lecture/Pie/Pie';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';
import * as lectureActions from '../../actions/lecture';

import config from '../../config';
const { SERVER_URL } = config();

class Lecture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lecture: {},
      instructor: {},
      comments: [],
      reviews: []
    };
  }

  static propTypes = {};

  async componentDidMount() {
    const { name } = this.props.name.match.params;
    const { actionLecture } = this.props;

    const { data } = await http.get(`${SERVER_URL}/lecture/${name}`);
    // console.log('[+] ////////// data = ', data);
    this.setState(
      {
        ...this.state,
        lecture: data.lecture[0],
        instructor: data.instructor[0],
        reviews: data.reviews,
        comments: data.comments
      },
      () => {
        actionLecture.set_all(this.state);
      }
    );
  }

  _renderPage = () => {};

  render() {
    // console.log('[+] lecture = ', this.state.lecture);
    // console.log('[+] instrucgtor = ', this.state.instructor);
    const { user } = this.props.storeSignin;
    const { comments, reviews } = this.props.storeLecture;
    const { lecture } = this.state;

    return (
      <React.Fragment>
        <LectureCard
          lecture={this.state.lecture}
          instructor={this.state.instructor}
        />
        <DivContainer>
          <DivAverage>
            <PaperSheet title="Reviews Average : ">
              <DivDetail>{`${this.state.lecture.review} / 5`}</DivDetail>
              {reviews ? (
                <CommonReview
                  type="lecture"
                  name={this.state.lecture.name}
                  user={user.name}
                  reviews={reviews}
                />
              ) : null}
            </PaperSheet>
          </DivAverage>

          <DivChart>
            <BarChart reviews={this.props.storeLecture.reviews} />
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
        {/* <PaperSheet title="Review">
          {reviews ? (
            <CommonReview
              type="lecture"
              name={this.state.lecture.name}
              user={user.name}
              reviews={reviews}
            />
          ) : null}
        </PaperSheet> */}

        {comments ? (
          <CommonComment
            type="lecture"
            name={this.state.lecture.name}
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
  text-align: center;
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
    storeLecture: state.lecture
  }),
  dispatch => ({
    actionSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionLecture: bindActionCreators(lectureActions, dispatch)
  })
)(Lecture);
