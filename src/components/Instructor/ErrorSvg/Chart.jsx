import React, { Component } from 'react';
import RadarChart from 'react-svg-radar-chart/docs';
import 'react-svg-radar-chart/docs/css/index.css';

class SvgChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          data: {
            battery: 0.7,
            design: 0.8,
            useful: 0.9,
            speed: 0.67,
            weight: 0.8
          },
          meta: { color: 'blue' }
        },
        {
          data: {
            battery: 0.6,
            design: 0.85,
            useful: 0.5,
            speed: 0.6,
            weight: 0.7
          },
          meta: { color: 'red' }
        }
      ],

      captions: {
        battery: 'Battery Capacity',
        design: 'Design',
        useful: 'Usefulness',
        speed: 'Speed',
        weight: 'Weight'
      }
    };
  }
  render() {
    return (
      <RadarChart
        captions={this.state.captions}
        data={this.state.data}
        size={450}
      />
    );
  }
}

export default SvgChart;
