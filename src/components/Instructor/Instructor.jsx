import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import http from '../../services/httpService';

import InstructorCard from '../Instructor/Card/Card';
import BarChart from '../common/Chart/Bar/Chart';
import CommonCardList from '../common/Card/CardList.jsx';
import CommonComment from '../common/Comment/Comment.jsx';
import CommonReview from '../common/Review/Review.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';
import * as instructorActions from '../../actions/instructor';

import config from '../../config';
const { SERVER_URL } = config();

class Instructor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructor: {},
      lectures: [],
      books: [],
      comments: [],
      reviews: [],
      review: { clicked: false },
      comment: { clicked: false }
    };

    this.handleClickReview = this.handleClickReview.bind(this);
    this.handleClickComment = this.handleClickComment.bind(this);
  }

  static proptypes = {};

  async componentDidMount() {
    const { name } = this.props.name.match.params;
    const { data } = await http.get(`${SERVER_URL}/instructor/${name}`);
    const { actionInstructor } = this.props;
    console.log('[+] Insturcotr : props = ', data);

    const instructor = {
      instructor: data.instructor[0],
      lectures: data.lectures,
      books: data.books,
      comments: data.comments,
      reviews: data.reviews
    };
    actionInstructor.set_all(instructor);

    this.setState({
      ...this.state,
      instructor: data.instructor[0],
      lectures: data.lectures,
      comments: data.comments,
      books: data.books,
      reviews: data.reviews
    });
  }

  handleClickReview = e => {
    this.setState(prevState => ({
      ...this.state,
      review: {
        ...this.state.review,
        clicked: !prevState.review.clicked
      }
    }));
  };

  handleClickComment = e => {
    this.setState(prevState => ({
      ...this.state,
      comment: {
        ...this.state.review,
        clicked: !prevState.comment.clicked
      }
    }));
  };

  _renderPage = () => {};

  render() {
    const { user } = this.props.storeSignin;
    // const { classes } = this.props;
    const { comments, reviews } = this.props.storeInstructor;
    console.log('[+] Instructor : reviews = ', reviews);
    return (
      <React.Fragment>
        <InstructorCard instructor={this.state.instructor} />

        <DivContainer>
          <DivAverage>
            <PaperSheet title="Reviews Average : ">
              <DivDetail>{`${this.state.instructor.review} / 5`}</DivDetail>
              {reviews ? (
                <CommonReview
                  type="instructor"
                  name={this.state.instructor.name}
                  user={user.name}
                  reviews={reviews}
                />
              ) : null}
            </PaperSheet>
          </DivAverage>

          <DivChart>
            <BarChart reviews={this.props.storeInstructor.reviews} />
          </DivChart>
        </DivContainer>
        {/* 
        <PaperSheet title="Review">
          <CommonReview
            type="instructor"
            name={this.state.instructor.name}
            user={user.name}
            reviews={reviews}
          />
        </PaperSheet> */}

        <PaperSheet title="Lectures">
          {this.state.lectures
            .sort((a, b) => {
              if (a.review < b.review) {
                return 1;
              }
              if (a.review > b.review) {
                return -1;
              }
              return 0;
            })
            .map(lecture => {
              return (
                <CommonCardList
                  type="lecture"
                  title={lecture.name}
                  url={lecture.url}
                  image={lecture.image}
                  time=""
                  review={lecture.review}
                />
              );
            })}
          {/* {this.state.lectures.map(lecture => {
            return (
              <CommonCardList
                type="lecture"
                title={lecture.name}
                url={lecture.url}
                image={lecture.image}
                time=""
                review={lecture.review}
              />
            );
          })} */}
        </PaperSheet>
        <PaperSheet title="Books">
          {this.state.books
            .sort((a, b) => {
              if (a.review < b.review) {
                return 1;
              }
              if (a.review > b.review) {
                return -1;
              }
              return 0;
            })
            .map(book => {
              return (
                <CommonCardList
                  type="book"
                  title={book.name}
                  url={book.url}
                  image={book.image}
                  time=""
                  review={book.review}
                />
              );
            })}
          {/* {this.state.books.map(book => {
            return (
              <CommonCardList
                type="book"
                title={book.name}
                url={book.url}
                image={book.image}
                time=""
                review={book.review}
              />
            );
          })} */}
        </PaperSheet>
        <CommonComment
          type="instructor"
          name={this.state.instructor.name}
          user={user.name}
          comments={comments}
        />
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
  font-size: 2.5rem;
  /* padding: 1rem; */
  /* margin: 1rem; */
  flex-shrink: 0;
  /* border: 1px solid black; */
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
    storeInstructor: state.instructor
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionInstructor: bindActionCreators(instructorActions, dispatch)
  })
)(Instructor);
