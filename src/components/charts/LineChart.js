import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const LineChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        curve='basis'
        enableArea={true}
      />
      ;
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array,
};

export default LineChart;
