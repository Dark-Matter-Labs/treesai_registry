import { ResponsiveBarCanvas } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className='my-5 mx-5'>
      <div className='flex items-center gap-5 pb-4'>
        <div className='px-5 py-4 bg-green-600 rounded-full'></div>
        <div>
          <p className='book-intro-sm text-dark-wood-800'> Street Trees</p>
        </div>
      </div>
      <div className='flex items-center gap-5 pb-4'>
        <div className='px-5 py-4 bg-dark-wood-800 rounded-full'></div>
        <div>
          <p className='book-intro-sm text-dark-wood-800'>Urban Park</p>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <div className='px-5 py-4 bg-indigo-600 rounded-full'></div>
        <div>
          <p className='book-intro-sm text-dark-wood-800'>Woodland</p>
        </div>
      </div>

      <div className='px-4 py-4 rounded-[30px]' style={{ height: '400px' }}>
        <ResponsiveBarCanvas
          data={data}
          keys={['budget']}
          indexBy='typology'
          colorBy='indexValue'
          theme={{
            background: '#FCFCFC',
            textColor: '#4F46E5',
          }}
          colors={['#1EB792', '#2F3130', '#4F46E5']}
          padding={0.05}
          margin={{ top: 80, right: 30, bottom: 60, left: 80 }}
          axisBottom={{
            legend: 'PROJECTS',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'number of trees',
            legendPosition: 'middle',
            legendOffset: -60,
          }}
          enableGridX={false}
          enableGridY={false}
          enableLabel={false}
        />
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array,
};

export default BarChart;
