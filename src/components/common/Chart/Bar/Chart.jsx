import React from 'react';
import { BarChart } from 'react-d3-components';

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
        { x: '⭐', y: worst },
        { x: '⭐⭐', y: bad },
        { x: '⭐⭐⭐', y: soso },
        { x: '⭐⭐⭐⭐', y: better },
        { x: '⭐⭐⭐⭐⭐', y: best }
      ]
    }
  ];

  return (
    reviews.length !== 0 && (
      <BarChart
        data={data}
        width={700}
        height={350}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
    )
  );
};

export default Chart;
