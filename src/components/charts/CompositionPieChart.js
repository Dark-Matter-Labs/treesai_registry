import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function formatDataForPie(percentageConifer) {
  return [
    {
      id: 'Conifer',
      label: 'Conifer',
      value: percentageConifer,
      color: 'hsl(121, 100%, 13%)',
    },
    {
      id: 'Deciduous',
      label: 'Deciduous',
      value: 100 - percentageConifer,
      color: 'hsl(121, 100%, 30%)',
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
        <ResponsivePie
          data={data}
          colors={{ datum: 'data.color' }}
          width={350}
          height={350}
          margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
          animate={true}
          activeOuterRadiusOffset={8}
          innerRadius={0.8}
        />
      </div>
    </div>
  );
}

CompositionPieChart.propTypes = {
  data: PropTypes.number,
};
