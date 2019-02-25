import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

import CommonSearchList from '../../common/SearchList/SearchList.jsx';
// import IntegrationAutosuggest from '../IntegrationAutosuggest/IntegrationAutosuggest.jsx';
import CourseComment from '../../Courses/Comment/Comment.jsx';
import CommonPaperSheet from '../../common/PaperSheet/PaperSheet.jsx';
import CourseRender from '../CourseRender/CourseRender.jsx';
import CourseRegisterStep from '../CourseRegister/RegisterStep.jsx';
import CommonComment from '../../common/Comment/Comment';
import CourseComments from '../../Course/Comments/Comments.jsx';

import Stepper from 'react-stepper-horizontal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../../actions/signin';
import * as topicsActions from '../../../actions/topics';
import * as topicActions from '../../../actions/topic';
import * as instructorActions from '../../../actions/instructor';
import * as bookActions from '../../../actions/book';
import * as lectureActions from '../../../actions/lecture';
import * as lecturesActions from '../../../actions/lectures';
import * as courseActions from '../../../actions/course';

import http, { SERVER_URL } from '../../../services/httpService.js';

class CourseRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      topic: '',
      lecture: '',
      book: '',
      comment: '',
      step: '',
      activeStep: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleValueTitle = this.handleValueTitle.bind(this);
    this.handleClickRegisterCourseUnit = this.handleClickRegisterCourseUnit.bind(
      this
    );
    this.handleClickCourseTitle = this.handleClickCourseTitle.bind(this);
    this.handleClickCourseFinal = this.handleClickCourseFinal.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    const { storeTopics, storeLecture } = this.props;

    console.log('[+] //////// storeTopics = ', storeTopics);
    console.log('[+] //////// storeLecture = ', storeLecture);
  }

  handleChangeComment = e => {
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  };

  handleValueTitle = e => {
    this.setState({
      ...this.state,
      valueTitle: e.target.value
    });
  };

  handleClickCourseTitle = e => {
    const { actionCourse } = this.props;

    actionCourse.set_name(this.state.valueTitle);
    this.setState({
      ...this.state,
      activeStep: 1
    });
  };

  handleClickRegisterCourseUnit = e => {
    const { actionCourse } = this.props;
    const { topic, lecture, book } = this.props.storeCourse;

    let course = {};
    topic && (course.topic = topic);
    lecture && (course.lecture = lecture);
    book && (course.book = book);
    course.comment = this.state.comment;

    actionCourse.add_course(course);
    this.setState({ ...this.state, activeStep: 1 });
  };

  handleClick = () => {
    this.setState(prevState => ({
      ...this.state,
      isClicked: !prevState.isClicked
    }));
  };

  handleClickCourseFinal = e => {
    this.setState({
      ...this.state,
      activeStep: 3
    });
  };

  handleClickSubmit = async () => {
    const { name, topic, courses } = this.props.storeCourse;
    const { user } = this.props.storeSignin;

    const apiEndpoint = `${SERVER_URL}/course/${topic}/`;
    let course = {
      name: name,
      topic: topic,
      courses: courses,
      write: user.name
    };

    const { data } = await http.post(apiEndpoint, {
      course: course
    });

    this.setState({
      ...this.state,
      isClicked: false
    });
    console.log('[+] handleClickSubmit in CourseRegister : data = ', data);
  };

  render() {
    const { topics } = this.props.storeTopics;
    const { lectures } = this.props.storeCourse.data;
    const { books } = this.props.storeCourse.data;
    const { course, courses, name, review } = this.props.storeCourse;

    return (
      <React.Fragment>
        {this.state.isClicked ? (
          <React.Fragment>
            <Button
              color="secondary"
              size="lg"
              block
              onClick={this.handleClick}
            >
              Cancle to Register New Course
            </Button>
            <CourseRender
              name={name}
              course={course}
              courses={courses}
              review={review}
            />
            <Button
              color="primary"
              size="lg"
              block
              onClick={this.handleClickSubmit}
            >
              Submit New Course
            </Button>
            <CommonPaperSheet title="Recommend your great course for joy of learning.">
              <div>
                <Stepper
                  steps={[
                    { title: 'Set Title' },
                    { title: 'Suggest One-Step (Lecture/Book)' },
                    { title: 'Repeat 2' },
                    { title: 'Final Comment' }
                  ]}
                  activeStep={this.state.activeStep}
                />
              </div>
              <br />
              {this.state.activeStep === 0 && (
                <InputGroup>
                  <InputGroupAddon addonType="comment">
                    <InputGroupText>Title</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title of your suggestion for new course."
                    onChange={this.handleValueTitle}
                    value={this.state.valueTitle}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="primary"
                      onClick={this.handleClickCourseTitle}
                    >
                      Next
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              )}
              {this.state.activeStep === 1 && (
                <div>
                  <h5>1. Select Topic </h5>
                  <CommonSearchList
                    type="topic"
                    title="Topic"
                    arrays={topics}
                  />
                  <h5>2. Select Lecture or Book</h5>
                  <CommonSearchList
                    type="lecture"
                    title="Lecture"
                    arrays={lectures}
                  />
                  <CommonSearchList type="book" title="Book" arrays={books} />
                  <h5>3. Share why you recommend this.</h5>
                  <InputGroup>
                    <InputGroupAddon addonType="comment">
                      <InputGroupText>Comment</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="title"
                      placeholder="placeholder"
                      value={this.state.comment}
                      onChange={this.handleChangeComment}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button
                        color="secondary"
                        block
                        onClick={this.handleClickRegisterCourseUnit}
                      >
                        Submit this One-Step (Lecture/Book)
                      </Button>
                    </InputGroupAddon>
                    {'   '}
                    <InputGroupAddon addonType="append">
                      <Button
                        color="primary"
                        block
                        onClick={this.handleClickCourseFinal}
                      >
                        Next to Final Comment
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              )}
              {this.state.activeStep === 3 && <CourseComments />}
            </CommonPaperSheet>
          </React.Fragment>
        ) : (
          <Button color="primary" size="lg" block onClick={this.handleClick}>
            Submit New Course
          </Button>
        )}
      </React.Fragment>
    );
  }
}

// export default CourseRegister;
export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeTopic: state.topic,
    storeInstructor: state.instructor,
    storeBook: state.book,
    storeLecture: state.lecture,
    storeLectures: state.lectures,
    storeCourse: state.course
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionTopic: bindActionCreators(topicActions, dispatch),
    actionInstructor: bindActionCreators(instructorActions, dispatch),
    actionBook: bindActionCreators(bookActions, dispatch),
    actionLecture: bindActionCreators(lectureActions, dispatch),
    actionLectures: bindActionCreators(lecturesActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(CourseRegister);
