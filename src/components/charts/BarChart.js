import { ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['High Maintenance', 'Medium maintenance', 'Low maintenance']}
        indexBy='years'
        groupMode='grouped'
        padding={0.3}
        margin={{ top: 80, right: 20, bottom: 60, left: 40 }}
        axisBottom={{
          legend: 'YEARS RANGES',
          legendOffset: 40,
        }}
        colors={['hsl(31, 70%, 50%)', 'hsl(347, 70%, 50%)', 'hsl(135, 70%, 50%)']}
        colorBy="id"
        theme={{
          background: '#FCFCFC',
          textColor: '#1A0789',
        }}
        enableGridX={false}
        enableGridY={false}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array,
};

export default BarChart;
