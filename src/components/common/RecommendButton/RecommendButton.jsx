import React from 'react';
import {
  Input,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import http from '../../../services/httpService';
import { SERVER_URL } from '../../../services/httpService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as topicActions from '../../../actions/topic';

// TODO: 기술 발표 자료 얘시
class RecommendButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,

      instructor: {
        name: '',
        fullName: '',
        gitHub: '',
        mainUrl: '',
        image: '',
        lang: 'eng'
      },
      lecture: {
        name: '',
        url: '',
        image: '',
        free: 'Free',
        lang: 'eng'
      },
      book: {
        name: '',
        url: '',
        image: '',
        free: 'Free',
        lang: 'eng'
      },

      errorsInstructor: {
        name: '',
        fullName: ''
      },
      errorsLecture: {
        name: '',
        url: ''
      },
      errorsBook: {
        name: '',
        url: ''
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  handleClick = e => {
    this.setState(prevState => ({
      ...this.state,
      clicked: !prevState.clicked
    }));
  };

  //-----

  instructorNameValidate = () => {
    const errorsInstructor = {};

    if (this.state.instructor.name.length === 0) {
      if (this.state.instructor.name.trim() === '') {
        errorsInstructor.name = 'Name is Required';
      }
    }

    if (errorsInstructor) {
      return Object.keys(errorsInstructor).length === 0
        ? null
        : errorsInstructor;
    }
  };

  instructorFullnameValidate = () => {
    const errorsInstructor = {};

    if (this.state.instructor.fullName.length === 0) {
      if (this.state.instructor.fullName.trim() === '')
        errorsInstructor.fullName = 'Full Name is Required.';
    }

    if (errorsInstructor) {
      return Object.keys(errorsInstructor).length === 0
        ? null
        : errorsInstructor;
    }
  };

  lectureNameValidate = () => {
    const errorsLecture = {};

    if (this.state.lecture.name.length === 0) {
      if (this.state.lecture.name.trim() === '')
        errorsLecture.name = 'Name is Required.';
    }

    if (errorsLecture) {
      return Object.keys(errorsLecture).length === 0 ? null : errorsLecture;
    }
  };

  lectureUrlValidate = () => {
    const errorsLecture = {};

    if (this.state.lecture.url.length === 0) {
      if (this.state.lecture.url.trim() === '')
        errorsLecture.url = 'URL is Required.';
    }

    if (errorsLecture) {
      return Object.keys(errorsLecture).length === 0 ? null : errorsLecture;
    }
  };

  bookNameValidate = () => {
    const errorsBook = {};

    if (this.state.book.name.length === 0) {
      if (this.state.book.name.trim() === '')
        errorsBook.name = 'Name is Required.';
    }

    if (errorsBook) {
      return Object.keys(errorsBook).length === 0 ? null : errorsBook;
    }
  };

  bookUrlValidate = () => {
    const errorsBook = {};

    if (this.setState.book.url.length === 0) {
      if (this.state.book.url.trim() === '')
        errorsBook.url = 'URL is Required.';
    }

    if (errorsBook) {
      return Object.keys(errorsBook).length === 0 ? null : errorsBook;
    }
  };

  submitClick = async e => {
    const { instructor, lecture, book } = this.state;
    const { topic, type, actionTopic } = this.props;

    if (instructor.name.length !== 0 || instructor.fullName.length !== 0) {
      if (instructor.name.length === 0) {
        const errorsInstructor = this.instructorNameValidate();
        this.setState({
          ...this.state,
          errorsInstructor
        });
      }
      if (instructor.fullName.length === 0) {
        const errorsInstructor = this.instructorFullnameValidate();
        this.setState({
          ...this.state,
          errorsInstructor
        });
      }
    } else if (lecture.name.length !== 0 || lecture.url.length !== 0) {
      if (lecture.name.length === 0) {
        const errorsLecture = this.lectureNameValidate();
        this.setState({
          ...this.state,
          errorsLecture
        });
      }
      if (lecture.url.length === 0) {
        const errorsLecture = this.lectureUrlValidate();
        this.setState({
          ...this.state,
          errorsLecture
        });
      }
    } else if (book.name.length !== 0 || book.url.length !== 0) {
      if (book.name.length === 0) {
        const errorsBook = this.bookNameValidate();
        this.setState({
          ...this.state,
          errorsBook
        });
      }
      if (book.url.length === 0) {
        const errorsBook = this.bookUrlValidate();
        this.setState({
          ...this.state,
          errorsBook
        });
      }
    }

    // const errors = this.validate();
    // this.setState({ errors });
    // if (errors) return;

    let apiEndpoint;
    let data;

    if (instructor.name.length !== 0 && instructor.fullName.length !== 0) {
      apiEndpoint = `${SERVER_URL}/instructor`;
      data = {
        instructor: {
          ...this.state.instructor,
          topic: topic.name
        }
      };
    } else if (lecture.name.length !== 0 && lecture.url.length !== 0) {
      apiEndpoint = `${SERVER_URL}/lecture`;
      data = {
        lecture: {
          ...this.state.lecture,
          free: this.state.lecture.free === 'Free' ? true : false,
          topic: topic.name
        }
      };
    } else if (book.name.length !== 0 && book.url.length !== 0) {
      apiEndpoint = `${SERVER_URL}/book`;
      data = {
        book: {
          ...this.state.book,
          free: this.state.book.free === 'Free' ? true : false,
          topic: topic.name
        }
      };
    }

    try {
      await http.post(apiEndpoint, data);
      console.log('[+] ///////// RecommendButton : ', type);

      if (type === 'instructor') actionTopic.add_instructor(data.instructor);
      else if (type === 'lecture') actionTopic.add_lecture(data.lecture);
      else if (type === 'book') actionTopic.add_book(data.book);

      this.setState({
        clicked: false
      });
    } catch (ex) {}
  };

  submitChange = e => {
    const { type } = this.props;

    if (type === 'instructor') {
      this.setState({
        ...this.state,
        instructor: {
          ...this.state.instructor,
          [e.target.name]: e.target.value
        }
      });
    } else if (type === 'lecture') {
      this.setState({
        ...this.state,
        lecture: {
          ...this.state.lecture,
          [e.target.name]: e.target.value
        }
      });
    } else if (type === 'book') {
      this.setState({
        ...this.state,
        book: {
          ...this.state.book,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  render() {
    const { instructor, lecture, book, arrays } = this.props;
    return (
      <React.Fragment>
        {this.state.clicked ? (
          <React.Fragment>
            <Button
              color="secondary"
              size="lg"
              block
              onClick={this.handleClick}
            >
              Close
            </Button>

            <FormGroup>
              <Typeahead
                labelKey="name"
                multiple="false"
                options={arrays}
                placeholder="Choose a state..."
              />
              <div className="form-group">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Name </InputGroupAddon>
                  <Input
                    placeholder={
                      instructor
                        ? "Instructor's name"
                        : lecture
                        ? "Lecture's name"
                        : book && "Book's name"
                    }
                    name={'name'}
                    value={
                      instructor
                        ? this.state.instructor.name
                        : lecture
                        ? this.state.lecture.name
                        : book && this.state.book.name
                    }
                    onChange={this.submitChange}
                  />
                </InputGroup>
                {this.state.errorsInstructor.name ? (
                  <div className="alert alert-danger">
                    {this.state.errorsInstructor.name}
                  </div>
                ) : this.state.errorsLecture.name ? (
                  <div className="alert alert-danger">
                    {this.state.errorsLecture.name}
                  </div>
                ) : (
                  this.state.errorsBook.name && (
                    <div className="alert alert-danger">
                      {this.state.errorsBook.name}
                    </div>
                  )
                )}
              </div>

              {instructor && (
                <div className="form-group">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      Full Name
                    </InputGroupAddon>
                    <Input
                      placeholder={"Instructor's Full Name"}
                      name={'fullName'}
                      value={this.state.instructor.fullName}
                      onChange={this.submitChange}
                    />
                  </InputGroup>
                  {this.state.errorsInstructor.fullName && (
                    <div className="alert alert-danger">
                      {this.state.errorsInstructor.fullName}
                    </div>
                  )}
                </div>
              )}

              {instructor && (
                <div className="form-group">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      GitHub
                    </InputGroupAddon>
                    <Input
                      placeholder={"Instructor's GitHub URL"}
                      name={'gitHub'}
                      value={this.state.instructor.gitHub}
                      onChange={this.submitChange}
                    />
                  </InputGroup>
                  <div />
                </div>
              )}

              <div className="form-group">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">URL</InputGroupAddon>
                  <Input
                    placeholder={
                      instructor
                        ? "Instructor's url"
                        : lecture
                        ? "Lecture's url"
                        : book && "Book's url"
                    }
                    name={instructor ? 'mainUrl' : 'url'}
                    value={
                      instructor
                        ? this.state.instructor.mainUrl
                        : lecture
                        ? this.state.lecture.url
                        : book && this.state.book.url
                    }
                    onChange={this.submitChange}
                  />
                </InputGroup>
                {this.state.errorsLecture.url ? (
                  <div className="alert alert-danger">
                    {this.state.errorsLecture.url}
                  </div>
                ) : (
                  this.state.errorsBook.url && (
                    <div className="alert alert-danger">
                      {this.state.errorsBook.url}
                    </div>
                  )
                )}
              </div>

              {/* image 보류 */}
              {/* <InputGroup>
                <InputGroupAddon addonType="prepend">Image</InputGroupAddon>
                <Input
                  placeholder={
                    instructor
                      ? "Instructor's image url"
                      : lecture
                      ? "Lecture's image url"
                      : book && "Book's image url"
                  }
                />
              </InputGroup> */}

              {lecture && (
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Free / Paid
                  </InputGroupAddon>
                  <Input
                    type="select"
                    bsSize="lg"
                    name={'free'}
                    value={this.state.lecture.free}
                    onChange={this.submitChange}
                  >
                    <option>Free</option>
                    <option>Paid</option>
                  </Input>
                </InputGroup>
              )}

              {book && (
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Free / Paid
                  </InputGroupAddon>
                  <Input
                    type="select"
                    bsSize="lg"
                    name={'free'}
                    value={this.state.book.free}
                    onChange={this.submitChange}
                  >
                    <option>Free</option>
                    <option>Paid</option>
                  </Input>
                </InputGroup>
              )}

              <InputGroup>
                <InputGroupAddon addonType="prepend">Language</InputGroupAddon>
                <Input
                  type="select"
                  bsSize="lg"
                  onChange={this.submitChange}
                  name={'lang'}
                  value={
                    instructor
                      ? this.state.instructor.lang
                      : lecture
                      ? this.state.lecture.lang
                      : book && this.state.book.lang
                  }
                >
                  <option>eng</option>
                  <option>kor</option>
                </Input>
              </InputGroup>

              <Button
                color="primary"
                size="lg"
                block
                onClick={this.submitClick}
              >
                Submit
              </Button>
            </FormGroup>
          </React.Fragment>
        ) : (
          <Button color="primary" size="lg" block onClick={this.handleClick}>
            {`Submit New ${
              instructor ? instructor : lecture ? lecture : book && book
            }`}
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    storeTopic: state.topic
  }),
  dispatch => ({
    actionTopic: bindActionCreators(topicActions, dispatch)
  })
)(RecommendButton);
