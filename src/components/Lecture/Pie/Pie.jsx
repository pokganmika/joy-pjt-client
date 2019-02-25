import React, { Component } from 'react';
import { /*BarChart,*/ PieChart } from 'react-d3-components';

class LectureChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        label: 'Grade',
        values: [
          { x: '😡', y: 23 },
          { x: '😠', y: 56 },
          { x: '😐', y: 432 },
          { x: '😊', y: 324 },
          { x: '😆', y: 123 }
        ]
      }
    };
  }
  render() {
    return (
      <PieChart
        data={this.state.data}
        width={600}
        height={400}
        margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
      />
    );
  }
}

export default LectureChart;
