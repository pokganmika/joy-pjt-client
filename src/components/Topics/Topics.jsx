import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';
// import Spinner from '../common/Spinner/Spinner';
import CommonPaperSheet from '../common/PaperSheet/PaperSheet.jsx';
import {
  InputGroup,
  InputGroupAddon,
  Input as ReactstrapInput
} from 'reactstrap';

import http from '../../services/httpService';
import auth from '../../services/authService';
import * as topicService from '../../services/topicService';

import querystring from 'query-string';

// import Search from './Search/Search';
// import Button from './Button/Button';

import TopicsCard from './Card/Card';
// import Input from '../common/Input/Input';
import filterByInput from '../../services/searchService';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';

import config from '../../config';
const { SERVER_URL } = config();

class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      value: ''
    };
  }

  async componentDidMount() {
    const { actionTopics, actionsSign } = this.props;

    const values = querystring.parse(this.props.location.search);
    if (values.token) {
      auth.loginWithJwt(values.token);
    }

    const user = auth.getCurrentUser();
    actionsSign.signin(user);

    const topics = await topicService.getTopics();
    actionTopics.get_topics(topics);

    this.setState({
      ...this.state,
      topics: topics
    });
  }

  handleChange = event => {
    this.setState(
      {
        ...this.state,
        value: event.target.value
      },
      () => {
        const { topics } = this.props.storeTopics;
        // let topicSelected = topics.filter(topic => {
        //   return topic.name.indexOf(this.state.value) !== -1;
        let topicSelected = filterByInput(topics, this.state.value);
        this.setState({
          ...this.state,
          topics: topicSelected
        });
      }
    );
  };

  _renderTopics = () => {
    return (
      <React.Fragment>
        <DivTopicsMenu>
          {this.state.topics.map(topic => {
            // (topic, index, topics)
            return (
              <TopicsCard
                image={topic.image}
                title={topic.name}
                description={''}
                key={topic}
              />
            );
          })}
        </DivTopicsMenu>
      </React.Fragment>
    );
  };

  render() {
    // const { topics } = this.props.storeTopics;
    return (
      <React.Fragment>
        <CommonPaperSheet>
          <InputGroup>
            <InputGroupAddon addonType="prepend">?</InputGroupAddon>
            <ReactstrapInput
              placeholder="Search Topics which you want to learn."
              value={this.state.value}
              onChange={this.handleChange}
            />
          </InputGroup>
          {this.state.topics ? (
            this._renderTopics()
          ) : (
            <DivSpinner>
              <Loader
                type="Triangle"
                color="#00BFFF"
                height="200"
                width="200"
              />
            </DivSpinner>
            // <Spinner />
          )}
        </CommonPaperSheet>
      </React.Fragment>
    );
  }
}

const DivTopicsMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  /* margin: 30px 30px 30px 30px; */
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
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch)
  })
)(Topics);
