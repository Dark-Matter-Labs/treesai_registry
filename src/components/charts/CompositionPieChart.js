import { Pie } from '@nivo/pie';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const commonProperties = {
  width: 350,
  height: 350,
  margin: { top: 80, right: 120, bottom: 80, left: 40 },
  animate: true,
  activeOuterRadiusOffset: 8,
};

function formatDataForPie(percentageConifer) {
  return [
    {
      id: 'Conifer',
      label: 'Conifer',
      value: percentageConifer,
      color: 'hsl(0, 70%, 50%)',
    },
    {
      id: 'Deciduous',
      label: 'Deciduous',
      value: 100 - percentageConifer,
      color: 'hsl(0, 50%, 70%)',
    },
  ];
}

export default function CompositionPieChart(props) {
  const [data, setData] = useState(formatDataForPie(47));

  useEffect(() => {
    const pieFormattedData = formatDataForPie(props.data);
    setData(pieFormattedData);
  }, [props.data]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3'>
      <div>
        <Pie data={data} {...commonProperties} innerRadius={0.8} />
      </div>
    </div>
  );
}

CompositionPieChart.propTypes = {
  data: PropTypes.number,
};
