import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import http from '../../services/httpService';
// import auth from '../../services/authService';
// import querystring from 'query-string';

import Title from '../common/Title/Title';
import CourseUnit from '../Courses/CourseUnit/CourseUnit.jsx';
import PaperSheet from '../common/PaperSheet/PaperSheet.jsx';

// import List from './List/List';
// import Filter from './Filter/Filter';

import * as signinActions from '../../actions/signin';
import * as topicsActions from '../../actions/topics';

// import config from '../../config';
// const { SERVER_URL } = config();

import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FaJsSquare, FaReact, FaNodeJs } from 'react-icons/fa';
import { Loader } from 'react-loader-spinner';
import { blue } from '@material-ui/core/colors';
import Course from '../Course/Course';

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: {},
      courses: []
    };
  }

  static propTypes = {
    topic: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
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
  }

  _renderCourses = () => {};

  render() {
    return (
      <React.Fragment>
        <Title title={this.state.topic} />
        {/* {this.state.courses.map((course, index) => {
          return <List name={course.name} period={course.period} key={index} />;
        })} */}
        {/* <Filter /> */}

        <CourseUnit />
        <PaperSheet title="Steps">
          <Steps direction="vertical">
            <Step title="javascript" description={'javascript'} />
            <div>
              <Step title="javascript" description={'javascript'} />
              <Step title="html" description={'html'} />
              <Step title="node.js" description={'node.js'} />
              <Step title="react" description={'react'} />
            </div>
            <Step title="html" description={'html'} />
            <Step title="node.js" description={'node.js'} />
            <Step title="react" description={'react'} />
          </Steps>
        </PaperSheet>
        <PaperSheet title="One-COlumn">
          <VerticalTimeline layout={'one-column'}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<FaJsSquare />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="April 2013"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FaReact />}
            >
              <h3 className="vertical-timeline-element-title">
                Content Marketing for Web, Mobile and Social Media
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Online Course
              </h4>
              <p>Strategy, Social Media</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </PaperSheet>
        <PaperSheet title="One-COlumn">
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<FaJsSquare />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="April 2013"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FaReact />}
            >
              <h3 className="vertical-timeline-element-title">
                Content Marketing for Web, Mobile and Social Media
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Online Course
              </h4>
              <p>Strategy, Social Media</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </PaperSheet>
        <PaperSheet title="Nested" classes={{ color: '#AAAA' }}>
          <VerticalTimeline layout={'one-column'}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<FaJsSquare />}
            >
              <h3 className="vertical-timeline-element-title">Javascript</h3>
            </VerticalTimelineElement>
            <VerticalTimeline layout={'one-column'}>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2011 - present"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FaJsSquare />}
              >
                <h3 className="vertical-timeline-element-title">
                  Creative Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Miami, FL
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, Project
                  Management, Team Leading
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="April 2013"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                icon={<FaReact />}
              >
                <h3 className="vertical-timeline-element-title">
                  Content Marketing for Web, Mobile and Social Media
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Online Course
                </h4>
                <p>Strategy, Social Media</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </VerticalTimeline>
        </PaperSheet>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    storeSignin: state.signin,
    storeTopics: state.topics,
    storeInstructor: state.instructor,
    storeBook: state.book
  }),
  dispatch => ({
    actionsSign: bindActionCreators(signinActions, dispatch),
    actionTopics: bindActionCreators(topicsActions, dispatch)
    // actionInstructor: bindActionCreators(instructorActions, dispatch),
    // actionBook: bindActionCreators(bookActions, dispatch)
  })
)(Courses);
