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
import filterByInput from '../../services/searchService';
import BooksCard from '../Books/Card/Card';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';

import config from '../../config';
const { SERVER_URL } = config();

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: {},
      books: [],
      fullBooks: [],
      value: ''
    };
  }

  static proptypes = {
    topic: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    fullBooks: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
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

    const { data } = await http.get(`${SERVER_URL}/b/${topic}`);
    this.setState({
      ...this.state,
      books: data.books,
      fullBooks: data.books
    });
  }

  _handleChange = event => {
    this.setState(
      {
        ...this.state,
        value: event.target.value
      },
      () => {
        let selectedBooks = filterByInput(
          this.state.fullBooks,
          this.state.value
        );
        this.setState({
          ...this.state,
          books: selectedBooks
        });
      }
    );
  };

  _renderBooks = () => {
    return (
      <div>
        {this.state.books.map(book => {
          return (
            <BooksCard
              name={book.name}
              image={book.image}
              lang={book.lang}
              url={book.mainUrl}
              free={book.free}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Title title={this.state.topic} />

        <InputGroup>
          <InputGroupAddon addonType="prepend">?</InputGroupAddon>
          <ReactstrapInput
            placeholder="Search your bible"
            value={this.state.value}
            onChange={this._handleChange}
          />
        </InputGroup>

        <DivContainer>
          <PaperSheet title="Books">
            {this.state.books ? (
              this._renderBooks()
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

          {/* <InstructorsFilter /> */}
        </DivContainer>
      </React.Fragment>
    );
  }
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
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
)(Books);
