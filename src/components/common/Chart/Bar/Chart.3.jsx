import React from 'react';
// import {
//   ResponsiveBarChart,
//   ResponsiveLineChart,
//   ResponsiveAreaChart,
//   ResponsiveScatterPlot,
//   ResponsivePieChart
// } from './ChartRes';
import ResponsiveBarChart from './ChartRes';

const Chart = ({ reviews }) => {
  let worst = 0;
  let bad = 0;
  let soso = 0;
  let better = 0;
  let best = 0;

  if (reviews) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].review === 1) {
        worst = worst + 1;
      } else if (reviews[i].review === 2) {
        bad = bad + 1;
      } else if (reviews[i].review === 3) {
        soso = soso + 1;
      } else if (reviews[i].review === 4) {
        better = better + 1;
      } else if (reviews[i].review === 5) {
        best = best + 1;
      }
    }
  }

  const data = [
    {
      key: 'review',
      values: [
        // { x: 'Worst', y: worst },
        // { x: 'Bad', y: bad },
        // { x: 'So so', y: soso },
        // { x: 'Better', y: better },
        // { x: 'Best', y: best }
        { x: '⭐', y: worst },
        { x: '⭐⭐', y: bad },
        { x: '⭐⭐⭐', y: soso },
        { x: '⭐⭐⭐⭐', y: better },
        { x: '⭐⭐⭐⭐⭐', y: best }
      ]
    }
  ];

  // the <div> tag is used to position and wrap the chart.
  {
    /* <div style={myPositionStyle}>
  <ResponsiveBarChart data={myData} />
</div>; */
  }

  return (
    <div /*style={myPositionStyle}*/>
      <ResponsiveBarChart data={data} />
    </div>
  );
};

export default Chart;
