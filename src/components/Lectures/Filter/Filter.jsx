import React, { Component } from 'react';
import styled from 'styled-components';

class LecturesFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: [],
      fullLectures: [],

      freeChecked: false,
      beginnerChecked: false,
      languageChecked: false
    };
  }

  _getInformation = () => {
    this.setState({
      ...this.state,
      lectures: this.props.state.lectures,
      fullLectures: this.props.state.fullLectures
    });
  };

  // _freeHandleClick() {
  //   this.state.freeChecked
  //     ? this.setState({
  //         freeChecked: false
  //       })
  //     : this.setState({
  //         freeChecked: true
  //     },
  //       () => {
  //         let selectedLecture;
  //     );
  // }

  render() {
    // console.log('filter box information : ', this.props);
    // this._getInformation();
    return (
      <React.Fragment>
        {/* {!(this.state.lectures && this.state.fullLectures) &&
          this._getInformation()} */}
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
      </React.Fragment>
    );
  }
}

const DivFilterContainer = styled.div`
  flex-direction: row;
  margin: 2rem;
  padding: 2rem;
  border: 1px solid gray;
  box-shadow: 2px 2px 2px 2px gray inset;
  border-radius: 10px;
`;

export default LecturesFilter;
