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

const LocationRiskChart = (props) => {
  const [councilInfo, setCouncilInfo] = useState(dummyCouncilInfo);

  useEffect(() => {
    if (props.cc_name !== undefined) {
      setCouncilInfo(getCouncilInfo(props.cc_name));
    }
  }, [props.cc_name]);

  return (
    <div className='location-risk-chart bg-white-300 m-8'>
      <div className='location-risk-chart-header'>
        <h3 className='location-risk-chart-header-title'>
          Location Risk for {councilInfo.cc_name}
        </h3>
        <p className='location-risk-chart-header-description'>
          The impact of your project is highly dependent n its specific location within the city.
          Here you can find the environmental and socio-economic risks that climate change poses to
          the area of your project:
        </p>
      </div>
      <div className='location-risk-chart-content'>
        <div className='location-risk-chart-content-header'>
          <h3 className='location-risk-chart-content-header-title'>Location Risk</h3>
          <p className='location-risk-chart-content-header-description'>
            This is a description of the location risk.
          </p>
          <div className='flex space-x-4'>
            <button
              type='button'
              className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {councilInfo.class}
            </button>
            <button
              type='button'
              className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Other Button
            </button>
            <button
              type='button'
              className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Third button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LocationRiskChart.propTypes = {
  cc_name: PropTypes.string,
};

export default LocationRiskChart;
