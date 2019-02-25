import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CommonCommentRender from '../../common/Comment/Render/Render.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../../actions/course';

class CourseComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isClicked: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleClick = e => {
    const { actionCourse } = this.props;
    actionCourse.set_review(this.state.text);

    this.setState({
      ...this.state,
      isClicked: true
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.isClicked && (
          <Form>
            <FormGroup>
              {/* <Label for="exampleText">Edit...</Label> */}
              <Input
                type="textarea"
                placeholder="Please share your thought. (Markdown syntax supported.)"
                style={{ height: 200 }}
                value={this.state.text}
                onChange={this.handleChange}
              />
            </FormGroup>
            <CommonCommentRender comments={this.state.text} />
            <Button color="primary" size="lg" block onClick={this.handleClick}>
              Submit
            </Button>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

// export default CourseComments;
export default connect(
  state => ({
    storeCourse: state.course
  }),
  dispatch => ({
    actionCourse: bindActionCreators(courseActions, dispatch)
  })
)(CourseComments);
