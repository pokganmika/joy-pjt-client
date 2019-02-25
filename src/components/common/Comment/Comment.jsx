import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';

import PaperSheet from '../../common/PaperSheet/PaperSheet.jsx';
import CommonCommentRender from '../../common/Comment/Render/Render.jsx';
import CommonCardList from '../../common/Card/CardList.jsx';
import CommonCommentList from '../../common/Comment/List/List.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../../actions/signin';
import * as topicsActions from '../../../actions/topics';
import * as instructorActions from '../../../actions/instructor';
import * as bookActions from '../../../actions/book';
import * as lectureActions from '../../../actions/lecture';
import * as courseActions from '../../../actions/course';

import http from '../../../services/httpService';
import { SERVER_URL } from '../../../services/httpService';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = { text: '', clicked: false, comments: {} };

    this.handleClickComment = this.handleClickComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClickComment = e => {
    this.setState(prevState => ({
      ...this.state,
      clicked: !prevState.clicked
    }));
  };

  handleClick = async e => {
    console.log('[+] /////////// ', this.state.text, this.props.user);
    const {
      type,
      name,
      actionInstructor,
      actionLecture,
      actionBook,
      actionCourse
    } = this.props;

    const apiEndpoint = `${SERVER_URL}/api/comment/${type}/${name}`;

    const { data } = await http.post(apiEndpoint, {
      writer: this.props.user,
      content: this.state.text
    });
    console.log('[+] //////////////// data = ', data);
    console.log('[+] //////////////// type = ', type);

    if (type === 'instructor') {
      actionInstructor.add_comments(data);
    } else if (type === 'lecture') {
      actionLecture.add_comments(data);
    } else if (type === 'book') {
      actionBook.add_comments(data);
    } else if (type === 'course') {
      actionCourse.add_comments(data);
    }

    this.setState(prevState => ({
      ...this.state,
      text: '',
      comments: data,
      clicked: !prevState.clicked
    }));
  };

  render() {
    return (
      <div>
        <PaperSheet title="Comment">
          {this.state.clicked ? (
            <React.Fragment>
              <Button
                color="secondary"
                size="lg"
                block
                onClick={this.handleClickComment}
              >
                Cancle to comment...
              </Button>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  {/* <Label for="exampleText">Edit...</Label> */}
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Please share your thought. (Markdown syntax supported.)"
                    style={{ height: 200 }}
                    value={this.state.text}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <CommonCommentRender comments={this.state.text} />
                <Button
                  color="primary"
                  size="lg"
                  block
                  onClick={this.handleClick}
                >
                  Submit
                </Button>
              </Form>
            </React.Fragment>
          ) : (
            <Button
              color="primary"
              size="lg"
              block
              onClick={this.handleClickComment}
            >
              Click to comment
            </Button>
          )}
          {/* <CommonCommentList comments={this.props.comments} /> */}
          {/* return <CommonCommentRender comments={comment.content} />; */}
          {Object.keys(this.props.comments).length !== 0
            ? this.props.comments.map(comment => {
                return (
                  <CommonCommentList
                    classes=""
                    title=""
                    image=""
                    url=""
                    comments={comment.content}
                    small={comment.content}
                    user={comment.writer}
                    updated_at={comment.updated_at}
                  />
                );
              })
            : null}
        </PaperSheet>
      </div>
    );
  }
}

const DivFull = styled.div`
  width: 1200px;
  right: 0px;
  top: 100px;
  height: 200px;
  background-color: lightgray;
`;

// export default Comment;
export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeInstructor: state.instructor,
    storeBook: state.book,
    storeCourse: state.course
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch),
    actionInstructor: bindActionCreators(instructorActions, dispatch),
    actionLecture: bindActionCreators(lectureActions, dispatch),
    actionBook: bindActionCreators(bookActions, dispatch),
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(Comment);
