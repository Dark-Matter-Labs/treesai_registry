import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveRadar } from '@nivo/radar';
import Risks from '../../data/GlasgowRiskRadar.json';

const RiskRadar = (props) => {
  const [councilName, setCouncilName] = useState('Anderston');

  useEffect(() => {
    if (props.cc_name !== undefined) {
      setCouncilName(props.cc_name);
    }
  }, [props.cc_name]);

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveRadar
        data={Risks}
        keys={[councilName]}
        indexBy='attribute'
        margin={{ top: 80, right: 90, bottom: 50, left: 90 }}
        colors={['#1EB792', '#2F3130', '#4F46E5']}
        borderColor={{ from: 'color' }}
        dotSize={5}
      />
    </div>
  );
};

RiskRadar.propTypes = {
  cc_name: PropTypes.string,
};

export default RiskRadar;
