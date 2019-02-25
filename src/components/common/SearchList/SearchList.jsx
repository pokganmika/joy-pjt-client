import React, { Component } from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import CommonCardList from '../../common/Card/CardList.jsx';
import CommonSearchListCard from '../../common/SearchList/SearchListCard.jsx';
import filterByInput from '../../../services/searchService.js';
import { selectyObjectByName } from '../../../services/searchService.js';
import http, { SERVER_URL } from '../../../services/httpService.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../../actions/signin';
import * as topicsActions from '../../../actions/topics';
import * as topicActions from '../../../actions/topic';
import * as instructorActions from '../../../actions/instructor';
import * as bookActions from '../../../actions/book';
import * as courseActions from '../../../actions/course';

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.state = {
      text: '',
      courseUnit: 0,
      topics: [],
      course: []
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      topics: []
    });
  }

  handleChange = event => {
    this.setState(
      {
        text: event.target.value
      },
      () => {
        const { arrays } = this.props;
        // let topicSelected = topics.filter(topic => {
        //   return topic.name.indexOf(this.state.value) !== -1;
        let topicSelected = filterByInput(arrays, this.state.text);
        this.setState({
          ...this.state,
          topics: this.state.text ? topicSelected : []
        });
      }
    );
  };

  handleClick = event => {
    const { arrays } = this.props;
    const topicSelected = filterByInput(arrays, event.target.value);

    this.setState({
      ...this.state,
      topic: event.target.value,
      topics: filterByInput(arrays, event.target.text)
    });
  };

  handleCardClick = async topic => {
    console.log('[+] handleCardClick', topic);
    const { type, arrays, actionCourse } = this.props;
    const { lectures, books } = this.props.stroeCourse.data;

    if (type === 'topic') {
      const { data } = await http.get(`${SERVER_URL}/t/${topic}`);
      console.log('[+] ////// SearchList : data = ', data);

      let course = {};
      course.topic = topic;
      course.data = {};
      course.data.lectures = data.lectures;
      course.data.books = data.books;

      actionCourse.set_topic(course);
    } else if (type === 'lecture') {
      const selectedLecture = selectyObjectByName(lectures, topic)[0];
      actionCourse.set_lecture(selectedLecture);
    } else if (type === 'book') {
      const selectedBook = selectyObjectByName(books, topic)[0];
      actionCourse.set_book(selectedBook);
    }

    this.setState({
      ...this.state,
      topic: topic,
      text: topic,
      courseUnit: this.state.courseUnit,
      topics: filterByInput(arrays, topic)
    });
  };

  handleSubmitClick() {}

  render() {
    const { title, type, arrays, courseUnit } = this.props;
    return (
      <React.Fragment>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{title}</InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            name="title"
            placeholder={
              type === 'topic'
                ? 'Type Topic name which you want to make course up.'
                : type === 'lecture'
                ? 'Type Lecture name'
                : 'Type book name'
            }
            value={this.state.text}
            onChange={this.handleChange}
          />
        </InputGroup>
        {this.state.topics.map(array => {
          return (
            <CommonSearchListCard
              type={type}
              title={array.name}
              image={array.image}
              courseUnit={courseUnit}
              onClick={this.handleCardClick}
            />
          );
        })}
        <br />
      </React.Fragment>
    );
  }
}

// export default SearchList;
export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeTopic: state.topic,
    storeInstructor: state.instructor,
    storeBook: state.book,
    stroeCourse: state.course
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionTopic: bindActionCreators(topicActions, dispatch),
    actionInstructor: bindActionCreators(instructorActions, dispatch),
    actionBook: bindActionCreators(bookActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(SearchList);
