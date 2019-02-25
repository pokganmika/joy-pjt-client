import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaperSheet from '../PaperSheet/PaperSheet';
import { IoMdPerson, IoMdPlayCircle, IoIosBook } from 'react-icons/io';
import { MdMap } from 'react-icons/md';
import MaterialIcon /*, { colorPalette }*/ from 'material-icons-react';
import { Typography } from '@material-ui/core';

class Title extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  render() {
    const { instructors, lectures, books, courses } = this.props;
    return (
      <PaperSheet>
        <DivContainer>
          <TopicLogo image={this.props.title.image} />
          <DivTopicChildren>
            <H1TopicTitle>{this.props.title.name}</H1TopicTitle>
            <H3TopicContents>{`Tutorials and Courses`}</H3TopicContents>
            <DivCount>
              <Typography component="p">
                {/* <MaterialIcon icon="account_box" /> : {instructors.length} */}
                <IoMdPerson /> : {instructors.length}
              </Typography>
              <Typography component="p">
                {/* <MaterialIcon icon="picture_in_picture" /> : {lectures.length} */}
                <IoMdPlayCircle /> : {lectures.length}
              </Typography>
              <Typography component="p">
                {/* <MaterialIcon icon="book" /> : {books.length} */}
                <IoIosBook /> : {books.length}
              </Typography>
              <Typography component="p">
                {/* <MaterialIcon icon="extension" /> : {courses.length} */}
                <MdMap /> : {courses.length}
              </Typography>
            </DivCount>
            {/* <DivCount>
              <Typography component="p">
                <MaterialIcon icon="book" /> Books : {books.length}
              </Typography>
              <Typography component="p">
                <MaterialIcon icon="extension" /> Courses : {courses.length}
              </Typography>
            </DivCount> */}
          </DivTopicChildren>
        </DivContainer>
      </PaperSheet>
    );
  }
}

const TopicLogo = ({ image }) => {
  return (
    <LogoImage src={image} width="100" height="100" alt="Selected Topic Logo" />
  );
};

TopicLogo.propTypes = {
  image: PropTypes.string.isRequired
};

const DivContainer = styled.div`
  display: flex;
`;

const DivTopicChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 3rem;
`;

const DivCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 1rem;
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

export default Title;
