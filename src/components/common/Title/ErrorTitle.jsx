import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaperSheet from '../PaperSheet/PaperSheet';

class Title extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  };

  render() {
    return (
      <PaperSheet>
        <DivContainer>
          <DivTopic>
            <TopicLogo image={this.props.title.logo} />
            <DivTopicChildren>
              <H1TopicTitle>{this.props.title.name}</H1TopicTitle>
              <H3TopicContents>{`${
                this.props.title.name
              } Tutorials and Courses`}</H3TopicContents>
              <Button>+ Follow</Button>
            </DivTopicChildren>
          </DivTopic>
        </DivContainer>
      </PaperSheet>
    );
  }
}

const TopicLogo = ({ image }) => {
  return <LogoImage src={image} alt="Selected Topic Logo" />;
};

TopicLogo.propTypes = {
  image: PropTypes.string.isRequired
};

const DivContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DivTopic = styled.div`
  display: flex;
  width: 90%;
  box-shadow: 2px 2px 2px 2px gray inset;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const DivTopicChildren = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImage = styled.img`
  max-width: 10rem;
  max-height: 10rem;
`;

const H1TopicTitle = styled.h1`
  /* font-size: 5rem; */
  margin-left: 1rem;
`;

const H3TopicContents = styled.h3`
  /* font-size: 5rem; */
  margin-left: 1rem;
`;

const Button = styled.button`
  color: white;
  background-color: orange;
  margin: 1rem;
  max-width: 10rem;
`;

export default Title;
