import { ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SmallBarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        data={data}
        keys={['Value']}
        indexBy='Expenditure'
        padding={0.3}
        innerPadding={5}
        margin={{ top: 80, right: 20, bottom: 60, left: 40 }}
        axisBottom={{
          legend: 'Types of costs',
          legendOffset: 40,
        }}
        colors={['#1EB792', '#4F46E5', '#828784']}
        colorBy='id'
        theme={{
          background: '#F4F4F4',
          textColor: '#4F46E5',
        }}
        enableGridX={false}
        enableGridY={false}
        enableLabel={false}
      />
    </div>
  );
};

SmallBarChart.propTypes = {
  data: PropTypes.array,
};

export default SmallBarChart;
