import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCouncilInfo } from '../../utils/geojson_utils';

let dummyCouncilInfo = {
  'Area (ha)': 129.1768904,
  RS_simple: 0.25,
  cc_name: 'Govan East',
  class: 'low',
  exposure: 16.905754344177986,
  hazard: 29.06593393217024,
  local_auth: 'Glasgow City',
  risk_score: 22.020279207865705,
  vulnerability: 36.86601221679058,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LocationRiskChart = (props) => {
  const [councilInfo, setCouncilInfo] = useState(dummyCouncilInfo);

  useEffect(() => {
    if (props.cc_name !== undefined) {
      setCouncilInfo(getCouncilInfo(props.cc_name));
    }
  }, [props.cc_name]);

  return (
    <div className='location-risk-chart'>
      <div className='location-risk-chart-header'>
        <p className='pt-2'>
          Community Council: <span className='text-green-600'>{councilInfo.cc_name}</span>
        </p>
      </div>
      <div className='location-risk-chart-content'>
        <div className='location-risk-chart-content-header text-center py-4'>
          <span
            className={classNames(
              councilInfo.class === 'high' ? ' bg-indigo-700' : ' bg-indigo-400',
              'inline-flex justify-center py-4 uppercase px-8 border border-transparent shadow-sm bold-intro-sm rounded-xl text-white-200',
            )}
          >
            {councilInfo.class}
          </span>
          <p className='bold-intro-sm pt-1'>Flooding of sewers due to heavy rainfall</p>
        </div>
      </div>
    </div>
  );
};

LocationRiskChart.propTypes = {
  cc_name: PropTypes.string,
};

export default LocationRiskChart;
