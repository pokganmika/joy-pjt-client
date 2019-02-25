import React, { Component } from 'react';
import { Button } from 'reactstrap';

// import ReviewForm from './ErrorReviewForm.jsx';
import ReviewStar from '../Review/ReviewStar/ReviewStar';
// import CommonCardList from '../../common/Card/CardList';

class Review extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      clicked: false
    };
  }

  handleClick = e => {
    this.setState(prevState => ({
      ...this.state,
      clicked: !prevState.clicked
    }));
  };

  handleSubmit = () => {};

  render() {
    const { type, name, user } = this.props;

    return (
      <React.Fragment>
        <ReviewStar type={type} name={name} user={user} />
      </React.Fragment>
    );
  }
}

export default Review;
