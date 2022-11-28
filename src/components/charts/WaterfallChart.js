import { ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Inspirations from https://codesandbox.io/s/nivo-waterfall-chart-o8tgz?file=/src/WaterfallChart/constants.ts

const mockData = [
  {
    Year: '10',
    Value: 10,
    previous: 0,
  },
  {
    Year: '20',
    Value: 20,
    previous: 10,
  },
  {
    Year: '30',
    Value: 30,
    previous: 30,
  },
  {
    Year: '40',
    Value: 40,
    previous: 60,
  },
  {
    Year: '50',
    Value: 50,
    previous: 100,
  },
  {
    Year: 'Sub Total',
    Value: 150,
    previous: 0,
  },
];

const WaterfallChart = (props) => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    setData(mockData);
  }, [props.data]);

  return (
    <div className='border border-indigo-600 px-5 py-5 rounded-2xl' style={{ height: '300px' }}>
      <ResponsiveBar
        data={data}
        keys={['previous', 'Value']}
        indexBy='Year'
        padding={0.1}
        innerPadding={2}
        margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
        axisBottom={{
          legend: 'Years',
          legendOffset: 40,
        }}
        colors={['#FCFCFC', '#4F46E5', '#828784']}
        theme={{
          background: '#FCFCFC',
          textColor: '#4F46E5',
        }}
        enableGridX={false}
        enableGridY={false}
        enableLabel={false}
      />
    </div>
  );
};

WaterfallChart.propTypes = {
  data: PropTypes.array,
};

export default WaterfallChart;
