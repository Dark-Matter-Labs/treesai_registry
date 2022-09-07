import { Pie } from '@nivo/pie';
import PropTypes from 'prop-types';

const commonProperties = {
  width: 420,
  height: 420,
  margin: { top: 80, right: 120, bottom: 80, left: 90 },
  animate: true,
  activeOuterRadiusOffset: 8,
  colors: ['#1EB792', '#4F46E5', '#2F3130'],
};
/* eslint-disable */
const CenteredMetric = ({ centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor='middle'
      dominantBaseline='central'
      style={{
        fontSize: '18px',
        fontWeight: 300,
      }}
    >
      Year 1-5
    </text>
  );
};
const CenteredMetric2 = ({ centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor='middle'
      dominantBaseline='central'
      style={{
        fontSize: '18px',
        fontWeight: 300,
      }}
    >
      Year 6-10
    </text>
  );
};
const CenteredMetric3 = ({ centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor='middle'
      dominantBaseline='central'
      style={{
        fontSize: '18px',
        fontWeight: 300,
      }}
    >
      Year 11-50
    </text>
  );
};
/* eslint-enable */

export default function PieChart(props) {
  return (() => {
    if (props.type === 1) {
      return (
        <Pie
          data={props.data}
          {...commonProperties}
          innerRadius={0.8}
          enableArcLabels={false}
          activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
          layers={['arcs', CenteredMetric]}
        />
      );
    } else if (props.type === 2) {
      return (
        <Pie
          data={props.data}
          {...commonProperties}
          innerRadius={0.8}
          enableArcLabels={false}
          activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
          layers={['arcs', CenteredMetric2]}
        />
      );
    } else {
      return (
        <Pie
          data={props.data}
          {...commonProperties}
          innerRadius={0.8}
          enableArcLabels={false}
          activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
          layers={['arcs', CenteredMetric3]}
        />
      );
    }
  })();
}

PieChart.propTypes = {
  data: PropTypes.array,
};
