import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const LineChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        curve='cardinal'
        enableArea={true}
        colors={['#4F46E5', '#828784', '#1EB792']}
        isInteractive={true}
        pointSize={4}
        pointBorderWidth={2}
        enableSlices='x'
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Year',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Tree count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 4,
            symbolSize: 20,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      ;
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array,
};

export default LineChart;
