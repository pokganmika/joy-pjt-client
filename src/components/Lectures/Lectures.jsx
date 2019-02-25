import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';
import {
  InputGroup,
  InputGroupAddon,
  Input as ReactstrapInput
} from 'reactstrap';

import http from '../../services/httpService';

import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';
import Title from '../common/Title/Title';
import LecturesCard from '../Lectures/Card/Card';
import filterByInput from '../../services/searchService';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';

import config from '../../config';
const { SERVER_URL } = config();

class Lectures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: {},
      lectures: [],
      fullLectures: [],
      value: '',

      freeChecked: false
    };
  }

  static proptypes = {
    topic: PropTypes.object.isRequired,
    lectures: PropTypes.array.isRequired
  };

  async componentDidMount() {
    const { topic } = this.props.topic.match.params;
    const { topics } = this.props.storeTopics;
    const selectedTopic = topics.filter(list => {
      return list.name === topic;
    })[0];

    this.setState({
      ...this.state,
      topic: selectedTopic
    });

    const { data } = await http.get(`${SERVER_URL}/l/${topic}`);
    this.setState({
      ...this.state,
      lectures: data.lectures,
      fullLectures: data.lectures
    });
  }

  _handleChange = e => {
    this.setState(
      {
        ...this.state,
        value: e.target.value
      },
      () => {
        let selectedLecture = filterByInput(
          this.state.fullLectures,
          this.state.value
        );
        this.setState({
          ...this.state,
          lectures: selectedLecture
        });
      }
    );
  };

  _freeHandleClick() {
    if (this.state.freeChecked === false) {
      this.setState({ freeChecked: true }),
        () => {
          let checkedLecture = this.state.fullLectures.filter(obj => {
            return obj.free === true;
          });
          this.setState({
            ...this.state,
            lectures: checkedLecture
          });
        };
    } else {
      this.setState({ freeChecked: false }),
        () => {
          this.setState({
            ...this.state,
            lectures: this.state.fullLectures
          });
        };
    }
    // this.state.freeChecked === false
    //   ? this.setState(
    //       {
    //         freeChecked: true
    //       },
    //       () => {
    //         let checkedLecture = this.state.lectures.filter(obj => {
    //           return obj.free === true;
    //         });
    //         this.setState({
    //           ...this.state,
    //           lectures: checkedLecture
    //         });
    //       }
    //     )
    //   : this.setState({
    //       freeChecked: false
    //     });
  }

  _renderLecture = () => {
    return (
      <div>
        {this.state.lectures.map(lecture => {
          return (
            <div>
              <LecturesCard
                name={lecture.name}
                image={lecture.image}
                free={lecture.free}
                lang={lecture.lang}
                url={lecture.url}
                // topic={lecture.topic.name}
              />
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    console.log('[+] : ', this.state);
    return (
      <React.Fragment>
        <Title title={this.state.topic} />
        <hr />

        <InputGroup>
          <InputGroupAddon addonType="prepend">?</InputGroupAddon>
          <ReactstrapInput
            placeholder="Search lecture which you want to learn"
            value={this.state.value}
            onChange={this._handleChange}
          />
        </InputGroup>

        <DivContainer>
          <PaperSheet title="Lecture">
            {this.state.lectures ? (
              this._renderLecture()
            ) : (
              <DivSpinner>
                <Loader
                  type="Triangle"
                  color="#00BFFF"
                  height="200"
                  width="200"
                />
              </DivSpinner>
            )}
          </PaperSheet>

          <DivFilterContainer>
            <h2>Filter</h2>
            <hr />
            <div>
              <div>
                <br />
                <h4>Cost</h4>
                <div>
                  <input type="checkbox" onClick={this._freeHandleClick} />
                  <label for="Free">Free</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="Paid">Paid</label>
                </div>
              </div>
              <div>
                <br />
                <h4>Level</h4>
                <div>
                  <input type="checkbox" />
                  <label for="Beginner">Beginner</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="Advanced">Advanced</label>
                </div>
              </div>
              <div>
                <br />
                <h4>Language</h4>
                <div>
                  <input type="checkbox" />
                  <label for="English">English</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="Korean">Korean</label>
                </div>
              </div>
              <div>
                <br />
                <h4>Type</h4>
                <div>
                  <input type="checkbox" />
                  <label for="Theory">Theory</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="Ecercise">Exercise</label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label for="Project">Project</label>
                </div>
              </div>
            </div>
          </DivFilterContainer>
        </DivContainer>
      </React.Fragment>
    );
  }
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivFilterContainer = styled.div`
  flex-direction: row;
  margin: 2rem;
  padding: 2rem;
  border: 1px solid gray;
  box-shadow: 2px 2px 2px 2px gray inset;
  border-radius: 10px;
`;

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
    storeTopics: state.topics
  }),
  dispatch => ({
    actionSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch)
  })
)(Lectures);
