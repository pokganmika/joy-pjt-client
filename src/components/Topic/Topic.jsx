import React, { Component } from 'react';
import styled from 'styled-components';
import http from '../../services/httpService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
// import Spinner from '../common/Spinner/Spinner';
import RecommendButton from '../common/RecommendButton/RecommendButton';

// import Vote from '../common/Vote/Vote';
import CommonCardList from '../common/Card/CardList.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';
// import Emoji from '../common/Emoji';
// import MaterialIcon from 'material-icons-react';
import { IoMdPerson, IoMdPlayCircle, IoIosBook } from 'react-icons/io';
import { MdMap } from 'react-icons/md';
import { Typography } from '@material-ui/core';
import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';
import * as topicActions from '../../actions/topic';
import * as courseActions from '../../actions/course';
import * as lecturesActions from '../../actions/lectures';
import * as topicService from '../../services/topicService';
import filterByInput from '../../services/searchService';
import Title from '../common/Title/Title';
import InstructorsCard from '../Topic/Instructors/Card';
import LecturesCard from '../Topic/Lectures/Card';
import BooksCard from '../Topic/Books/Card';
import CoursesCard from '../Topic/Courses/Card';
import CourseRegister from '../Course/CourseRegister/CourseRegister.jsx';
// import Courses from './Courses/Courses';

import config from '../../config';
const { SERVER_URL } = config();

// selected topic
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      instructors: [],
      lectures: [],
      books: [],
      courses: [],
      selectedInstructors: [],
      selectedLectures: [],
      selectedBooks: [],
      selectedCourses: [],
      clicked: false
    };
  }

  async componentDidMount() {
    const { topic } = this.props.topic.match.params;
    // const topic = topicService.getTopic(this.props);

    const { actionTopic, actionTopics, actionLectures } = this.props;
    // const { instructors, lectures, books } = this.props.storeTopic;

    // this.setState({
    //   ...this.state,
    //   topic: topic
    // });

    const topics = await topicService.getTopics();

    // let { topics } = this.props.storeTopics;
    // // TODO: Workaround for loading
    // if (topics.length === 0) {
    //   const data = await http.get(SERVER_URL + '/topics');

    //   topics = data.data;
    //   actionTopics.get_topics(data.data);
    // }

    // const selectedTopic = filterByInput(topics, topic);

    const selectedTopic = topics.filter(obj => {
      return obj.name === topic;
    })[0];
    this.setState({ ...this.state, topic: selectedTopic });

    const { data } = await http.get(`${SERVER_URL}/t/${topic}`);

    this.setState(
      {
        ...this.state,
        instructors: data.instructors,
        lectures: data.lectures,
        books: data.books,
        courses: data.courses
      },
      () => {
        actionTopic.set_all({
          topic: topic,
          instructors: data.instructors,
          lectures: data.lectures,
          books: data.books,
          courses: data.courses
        });
        actionLectures.get_lectures(this.state.lectures);
      }
    );

    // TODO: 기술발표 설명 예시

    const selectedInstructors = [];
    const selectedLectures = [];
    const selectedBooks = [];
    const selectedCourses = [];

    const sortingMachine = arr => {
      return arr.sort((a, b) => {
        if (a.review < b.review) {
          return 1;
        }
        if (a.review > b.review) {
          return -1;
        }
        return 0;
      });
    };

    const sortedInstructors = sortingMachine(data.instructors);
    const sortedLectures = sortingMachine(data.lectures);
    const sortedBooks = sortingMachine(data.books);
    const sortedCourses = sortingMachine(data.courses);

    // const sortedInstructors = data.instructors.sort((a, b) => {
    //   if (a.review < b.review) {
    //     return 1;
    //   }
    //   if (a.review > b.review) {
    //     return -1;
    //   }
    //   return 0;
    // });

    // const sortedLectures = data.lectures.sort((a, b) => {
    //   if (a.review < b.review) {
    //     return 1;
    //   }
    //   if (a.review > b.review) {
    //     return -1;
    //   }
    //   return 0;
    // });

    // const sortedBooks = data.books.sort((a, b) => {
    //   if (a.review < b.review) {
    //     return 1;
    //   }
    //   if (a.review > b.review) {
    //     return -1;
    //   }
    //   return 0;
    // });

    for (let i = 0; i < 4; i++) {
      selectedInstructors.push(sortedInstructors[i]);
      selectedLectures.push(sortedLectures[i]);
      selectedBooks.push(sortedBooks[i]);
      selectedCourses.push(sortedCourses[i]);
    }

    this.setState({
      ...this.state,
      selectedInstructors: selectedInstructors,
      selectedLectures: selectedLectures,
      selectedBooks: selectedBooks,
      selectedCourses: selectedCourses
    });
  }

  _handleClick = () => {
    this.setState({
      clicked: true
    });
  };

  _renderTopic = () => {
    // const avatar = localStorage.getItem('avatar');
    const { instructors, lectures, books, courses } = this.props.storeTopic;
    return (
      <React.Fragment>
        <PaperSheet
          title={
            // <Link to={`/i/${this.state.topic.name}`}>
            // <h3>
            //   Instructors <Emoji symbol="🎓" label="smile" />
            // </h3>
            // </Link>
            <Typography component="h3">
              <h3>
                {/* <MaterialIcon icon="account_box" /> */}
                <IoMdPerson />
                {`  `}
                Instructor
              </h3>
            </Typography>
          }
        >
          <CardsContatiner>
            {this.state.selectedInstructors.map(instructor => {
              return <InstructorsCard instructor={instructor} />;
              // fullName={instructor.fullName}
              // name={instructor.name}
              // git={instructor.gitHub}
              // url={instructor.mainUrl}
              // image={instructor.image}
              // lang={instructor.lang}
              // key={instructor.name}
            })}
          </CardsContatiner>

          <PaperSheet title="More Instructors">
            {instructors &&
              instructors.map(instructor => {
                return (
                  <CommonCardList
                    type="instructor"
                    title={instructor.name}
                    url={instructor.mainUrl}
                    github={instructor.gitHub}
                    image={instructor.image}
                    time=""
                    review={instructor.review}
                  />
                );
              })}
            <RecommendButton
              type="instructor"
              arrays={instructors}
              instructor={'Instructor'}
              topic={this.state.topic}
            />
          </PaperSheet>
        </PaperSheet>

        <PaperSheet
          title={
            // <Link to={`/l/${this.state.topic.name}`}>
            // <h3>
            //   Lectures <Emoji symbol="📘" label="smile" />
            // </h3>
            // </Link>
            <Typography component="h3">
              <h3>
                {/* <MaterialIcon icon="picture_in_picture" /> */}
                <IoMdPlayCircle />
                {`  `}
                Lecture
              </h3>
            </Typography>
          }
        >
          <CardsContatiner>
            {this.state.selectedLectures.map(lecture => {
              return <LecturesCard lecture={lecture} />;
              // name={lecture.name}
              // image={lecture.image}
              // url={lecture.url}
              // lang={lecture.lang}
              // free={lecture.free}
            })}
          </CardsContatiner>

          <PaperSheet title="More Lectures">
            {lectures &&
              lectures.map(lecture => {
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
            <RecommendButton
              type="lecture"
              lecture={'Lecture'}
              arrays={lectures}
              topic={this.state.topic}
            />
          </PaperSheet>
        </PaperSheet>

        <PaperSheet
          title={
            // <Link to={`/b/${this.state.topic.name}`}>
            // <h3>
            //   Books <Emoji symbol="📘" label="smile" />
            // </h3>
            // </Link>
            <Typography component="h3">
              <h3>
                {/* <MaterialIcon icon="book" /> */}
                <IoIosBook />
                {`  `}
                Book
              </h3>
            </Typography>
          }
        >
          <CardsContatiner>
            {this.state.selectedBooks.map(book => {
              return <BooksCard book={book} />;
              // name={book.name}
              // image={book.image}
              // url={book.url}
              // lang={book.lang}
              // free={book.free}
            })}
          </CardsContatiner>

          <PaperSheet title="More Books">
            {books &&
              books.map(book => {
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
            <RecommendButton
              type="book"
              book={'Book'}
              topic={this.state.topic}
              arrays={books}
            />
          </PaperSheet>
        </PaperSheet>

        <PaperSheet
          title={
            <Link to={`/c/${this.state.topic.name}`}>
              {/* <h3>
                Courses <Emoji symbol="📘" label="smile" />
              </h3> */}
              <Typography component="h3">
                <h3>
                  {/* <MaterialIcon icon="extension" /> */}
                  <MdMap />
                  {`  `}
                  Courses
                </h3>
              </Typography>
            </Link>
          }
        >
          <CardsContatiner>
            {this.state.selectedCourses.map(course => {
              return <CoursesCard classes="" course={course} />;
            })}
          </CardsContatiner>
          <PaperSheet title="More Courses">
            {courses &&
              courses.map(course => {
                return (
                  <div>
                    <CommonCardList
                      type="course"
                      title={course.name}
                      url={course.url}
                      image={course.image}
                      time={course.updated_at}
                      review={course.review}
                    />
                  </div>
                );
              })}
            <CourseRegister />
          </PaperSheet>
        </PaperSheet>
      </React.Fragment>
    );
  };

  render() {
    const { topic, instructors, lectures, books, courses } = this.state;
    return (
      <React.Fragment>
        <Title
          title={topic}
          instructors={instructors}
          lectures={lectures}
          books={books}
          courses={courses}
        />

        <hr />

        {instructors && lectures ? (
          this._renderTopic()
        ) : (
          <DivSpinner>
            <Loader type="Triangle" color="#00BFFF" height="200" width="200" />
          </DivSpinner>
          // <Spinner />
        )}
      </React.Fragment>
    );
  }
}

const CardsContatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 30px 30px 30px 30px;
`;
// flex-direction: row

const DivSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
`;

export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeTopic: state.topic,
    storeLectures: state.lectures,
    storeCourse: state.course
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionTopic: bindActionCreators(topicActions, dispatch),
    actionLectures: bindActionCreators(lecturesActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(Topic);
