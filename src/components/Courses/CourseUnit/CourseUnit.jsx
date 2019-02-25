import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

import CommonSearchList from '../../common/SearchList/SearchList.jsx';
import IntegrationAutosuggest from '../IntegrationAutosuggest/IntegrationAutosuggest.jsx';
import CourseComment from '../../Courses/Comment/Comment.jsx';
import CommonPaperSheet from '../../common/PaperSheet/PaperSheet.jsx';
import CourseUnitRender from '../../Courses/CourseUnit/CourseUnitRender.jsx';

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

class CourseUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      topic: '',
      lecture: '',
      book: '',
      comment: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { storeTopics, storeLecture } = this.props;

    console.log('[+] //////// storeTopics = ', storeTopics);
    console.log('[+] //////// storeLecture = ', storeLecture);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  }

  handleClick() {
    const { actionCourse } = this.props;
    this.setState(
      {
        ...this.state,
        isClicked: true
      },
      () => {
        actionCourse.set_comment(this.state.comment);
      }
    );
  }

  render() {
    const { topics } = this.props.storeTopics;
    const { lectures } = this.props.storeCourse.data;
    const { books } = this.props.storeCourse.data;
    const { lecture, book, comment } = this.props.storeCourse;

    return (
      <React.Fragment>
        {this.state.isClicked ? (
          <CourseUnitRender lecture={lecture} book={book} comment={comment} />
        ) : (
          <CommonPaperSheet title="CourseUnit">
            <h5>1. Select Topic </h5>
            <CommonSearchList type="topic" title="Topic" arrays={topics} />
            <h5>2. Select Lecture or Book</h5>
            <CommonSearchList
              type="lecture"
              title="Lecture"
              arrays={lectures}
            />
            <CommonSearchList type="book" title="Book" arrays={books} />
            <h5>3. Share why you recommend this.</h5>
            {/* <CourseComment type="instructor" name="" user="" comments="" /> */}
            <InputGroup>
              <InputGroupAddon addonType="comment">
                <InputGroupText>Comment</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="title"
                placeholder="placeholder"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </InputGroup>
            <br />
            <Button color="primary" size="lg" block onClick={this.handleClick}>
              Register One CourseUnit
            </Button>
          </CommonPaperSheet>
        )}
      </React.Fragment>
    );
  }
}

// export default CourseUnit;
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
)(CourseUnit);
