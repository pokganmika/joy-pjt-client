import React from 'react';
import PaperSheet from '../../common/PaperSheet/PaperSheet.jsx';
import { BarChart } from 'react-charts-d3';

const InstructorCardInner = ({ instructor }) => {
  return (
    <ul>
      <li>
        Url : <a href={instructor.mainUrl}>{instructor.mainUrl}</a>
      </li>
      <li>
        Github: <a href={instructor.gitHub}>{instructor.gitHub}</a>
      </li>
    </ul>
  );
};

const Card = ({ instructor }) => (
  <React.Fragment>
    <PaperSheet
      title={instructor.fullName ? instructor.fullName : instructor.name}
    >
      <InstructorCardInner instructor={instructor} />
      <BarChart data={ChartData()} />
    </PaperSheet>
  </React.Fragment>
);

const ChartData = ({ reviews }) => {
  let one,
    two,
    three,
    four,
    five = 0;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].review === '1') {
      one++;
    } else if (reviews[i].review === '2') {
      two++;
    } else if (reviews[i].review === '3') {
      three++;
    } else if (reviews[i].review === '4') {
      four++;
    } else if (reviews[i].review === '5') {
      five++;
    }
  }
  return [
    {
      key: 'Grade',
      values: [
        { x: 'Worst', y: one },
        { x: 'Bad', y: two },
        { x: 'So so', y: three },
        { x: 'Better', y: four },
        { x: 'Best', y: five }
      ]
    }
  ];
};

export default Card;
