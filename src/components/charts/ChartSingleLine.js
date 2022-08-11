import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { dummyData } from './dummyData/dataLine.js';

const commonProperties = {
  margin: { top: 20, right: 20, bottom: 60, left: 40 },
  animate: true,
  yFormat: ' >-.2f',
  enableSlices: 'x',
  theme: {
    background: '#FCFCFC',
    textColor: '#1A0789',
  },
  colors: '#1A0789',
  enablePoints: false,
  enableGridX: false,
  enableGridY: false,
};

const ChartSingleLine = (props) => {
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        {...commonProperties}
        curve='monotoneX'
        enableArea={true}
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

ChartSingleLine.propTypes = {
  data: PropTypes.array,
};

export default ChartSingleLine;
