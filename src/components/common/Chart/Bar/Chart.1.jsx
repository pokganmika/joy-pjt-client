import React from 'react';
import { BarChart } from 'react-charts-d3';

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
        { x: 'Worst', y: worst },
        { x: 'Bad', y: bad },
        { x: 'So so', y: soso },
        { x: 'Better', y: better },
        { x: 'Best', y: best }
      ]
    }
  ];

  return reviews.length !== 0 && <BarChart data={data} />;
};

export default Chart;
