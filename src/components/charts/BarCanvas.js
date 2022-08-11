import { ResponsiveBarCanvas } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BarCanvas = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBarCanvas
        data={data}
        keys={['trees']}
        indexBy='years'
        padding={0.3}
        margin={{ top: 80, right: 20, bottom: 60, left: 40 }}
        axisBottom={{
          legend: 'YEARS RANGES',
          legendOffset: 40,
        }}
        colors='#1A0789'
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

BarCanvas.propTypes = {
  data: PropTypes.array,
};

export default BarCanvas;
