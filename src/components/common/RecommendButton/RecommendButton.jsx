import React from 'react';
import {
  Input,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import http from '../../../services/httpService';
import { SERVER_URL } from '../../../services/httpService';

// const defaultState = {
//   clicked: false,

//   instructor: {
//     name: '',
//     fullName: '',
//     gitHub: '',
//     mainUrl: '',
//     image: '',
//     lang: 'eng'
//   },
//   lecture: {
//     name: '',
//     url: '',
//     screenshot: '',
//     free: 'Free',
//     lang: 'eng'
//   },
//   book: {
//     name: '',
//     url: '',
//     screenshot: '',
//     free: 'Free',
//     lang: 'eng'
//   }
// };

const getDeepCopy = obj => JSON.parse(JSON.stringify(obj));

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
        screenshot: '',
        free: 'Free',
        lang: 'eng'
      },
      book: {
        name: '',
        url: '',
        screenshot: '',
        free: 'Free',
        lang: 'eng'
      }
    };
    // this.state = getDeepCopy(defaultState);
    // this.shadowState = getDeepCopy(defaultState);

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

  submitClick = async e => {
    const { instructor, lecture, book } = this.state;
    const apiEndpoint = `${SERVER_URL}/api/recommend`;

    if (instructor.name.length !== 0) {
      await http.post(apiEndpoint, {
        instructor: this.state.instructor
      });
    } else if (lecture.name.length !== 0) {
      const data = {
        ...this.state.lecture,
        free: this.state.lecture.free === "Free" ? true : false
      };
      await http.post(apiEndpoint, data);
    } else if (book.name.length !== 0) {
      const data = {
        ...this.state.book,
        free: this.state.book.free === "Free" ? true : false
      }
      await http.post(apiEndpoint, data);
    }
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

    // if (type === 'instructor') {
    //   this.shadowState.instructor[e.target.name] = e.target.value;
    // }
    // if (type === 'lecture') {
    //   this.shadowState.lecture[e.target.name] = e.target.value;
    // }
    // if (type === 'book') {
    //   this.shadowState.book[e.target.name] = e.target.value;
    // }
    // if (this.shadowState.lecture.free === 'Free') {
    //   this.shadowState.lecture.free = true;
    // } else {
    //   this.shadowState.lecture.free = false;
    // }
    // if (this.shadowState.book.free === 'Free') {
    //   this.shadowState.book.free = true;
    // } else {
    //   this.shadowState.book.free = false;
    // }

    this.setState(this.shadowState);

    // type === 'instructor'
    //   ? this.setState({
    //       ...this.state,
    //       instructor: {
    //         ...this.state.instructor,
    //         [e.target.name]: e.target.value
    //       }
    //     })
    //   : type === 'lecture'
    //   ? this.setState({
    //       ...this.state,
    //       lecture: {
    //         ...this.state.lecture,
    //         [e.target.name]: e.target.value
    //       }
    //     })
    //   : type === 'book' &&
    //     this.setState({
    //       ...this.state,
    //       book: {
    //         ...this.state.book,
    //         [e.target.name]: e.target.value
    //       }
    //     });
  };

  render() {
    console.log('렌더중');
    const { instructor, lecture, book } = this.props;
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
              {`Recommend ${
                instructor ? instructor : lecture ? lecture : book && book
              }`}
            </Button>
            <FormGroup>
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

              {instructor && (
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
              )}

              {instructor && (
                <InputGroup>
                  <InputGroupAddon addonType="prepend">GitHub</InputGroupAddon>
                  <Input
                    placeholder={"Instructor's GitHub URL"}
                    name={'gitHub'}
                    value={this.state.instructor.gitHub}
                    onChange={this.submitChange}
                  />
                </InputGroup>
              )}

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

              {/* image는 user가 올리기 힘들기 때문에 */}
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

              <Button color="primary" onClick={this.submitClick}>
                Submit
              </Button>
            </FormGroup>
          </React.Fragment>
        ) : (
          <Button color="primary" size="lg" block onClick={this.handleClick}>
            {`Recommend ${
              instructor ? instructor : lecture ? lecture : book && book
            }`}
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default RecommendButton;
