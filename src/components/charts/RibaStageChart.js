import { ResponsiveBarCanvas } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className='px-4 py-4 rounded-[30px]' style={{ height: '400px' }}>
      <ResponsiveBarCanvas
        data={data}
        keys={['projectsNumber']}
        indexBy='RIBAid'
        padding={0.05}
        innerPadding={0.1}
        margin={{ top: 40, right: 30, bottom: 60, left: 80 }}
        axisBottom={{
          legend: 'RIBA STAGES',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of projects',
          legendPosition: 'middle',
          legendOffset: -60,
        }}
        colorBy='id' // Use name later
        theme={{
          background: '#FCFCFC',
          textColor: '#4F46E5',
        }}
        colors={['#1EB792', '#2F3130', '#4F46E5']}
        enableGridX={false}
        enableGridY={false}
        enableLabel={false}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array,
};

export default BarChart;
