import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { dummyData } from './dummyData/dataLine.js';

const commonPropertiesMultiLine = {
  margin: { top: 20, right: 20, bottom: 60, left: 50 },
  animate: true,
  yFormat: ' >-.2f',
  enableSlices: 'x',
  theme: {
    background: '#FCFCFC',
    textColor: '#1A0789',
  },
  colors: ['#4F46E5', '#828784', '#1EB792'],
  enablePoints: false,
  enableGridX: false,
  enableGridY: false,
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
