import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { dummyData } from './dummyData/dataLine.js';

const commonPropertiesMultiLine = {
  width: 650,
  height: 400,
  margin: { top: 20, right: 50, bottom: 60, left: 50 },
  animate: true,
  yFormat: ' >-.2f',
  enableSlices: 'x',
  theme: {
    background: '#E5E7EB',
    textColor: '#374151',
  },
  colors: ['#1EA685', '#374151', '#C4C4C4'],
};

const ChartMultiLine = (props) => {
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        {...commonPropertiesMultiLine}
        curve='monotoneX'
        enableArea={false}
        data={data}
        xScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
        }}
        axisLeft={{
          legend: 'KG / p Tree',
          legendOffset: 12,
        }}
        axisBottom={{
          legend: 'YEAR',
          legendOffset: -12,
        }}
      />
    </div>
  );
};

ChartMultiLine.propTypes = {
  data: PropTypes.array,
};

export default ChartMultiLine;
