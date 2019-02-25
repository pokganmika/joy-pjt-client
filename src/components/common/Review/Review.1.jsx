import React, { Component } from 'react';
import { Button } from 'reactstrap';

// import ReviewForm from './ErrorReviewForm.jsx';
import ReviewStar from '../Review/ReviewStar/ReviewStar';
import CommonCardList from '../../common/Card/CardList';

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
    const { type, name, user, reviews } = this.props;

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
              Click to Review on {name}
            </Button>
            {/* <ReviewForm type={type} name={name} user={user} /> */}
            <ReviewStar type={type} name={name} user={user} />
          </React.Fragment>
        ) : (
          <Button color="primary" size="lg" block onClick={this.handleClick}>
            Click to Review on {name}
          </Button>
        )}
        {reviews.map(review => {
          return (
            <CommonCardList
              type="instructor"
              title={review.writer}
              small={review.review}
              url=""
              image=""
              time=""
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Review;
