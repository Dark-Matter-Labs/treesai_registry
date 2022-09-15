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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5'>
          <div className='location-risk-chart-content-header py-4 text-center border border-indigo-600 rounded-l-3xl bg-white-300'>
            <span
              className={classNames(
                councilInfo.flood_risk_classification === 'high' ||
                  councilInfo.flood_risk_classification === 'very high'
                  ? ' bg-indigo-700'
                  : ' bg-indigo-400',
                'bold-intro-sm inline-flex justify-center rounded-full border border-transparent py-4 px-4 uppercase text-white-200 shadow-sm',
              )}
            >
              {councilInfo.flood_risk_classification}
            </span>
            <p className='book-intro-sm pt-4'>Risk due to flooding</p>
          </div>
          <div className='location-risk-chart-content-header py-4 text-center border border-indigo-600 bg-white-300'>
            <span
              className={classNames(
                councilInfo.social_risk_classification === 'high' ||
                  councilInfo.social_risk_classification === 'very high'
                  ? ' bg-indigo-700'
                  : ' bg-indigo-400',
                'bold-intro-sm inline-flex justify-center rounded-full border border-transparent py-4 px-4 uppercase text-white-200 shadow-sm',
              )}
            >
              {councilInfo.social_risk_classification}
            </span>
            <p className='book-intro-sm pt-4'>Social risk</p>
          </div>
          <div className='location-risk-chart-content-header py-4 text-center border border-indigo-600 rounded-r-3xl bg-white-300'>
            <span
              className={classNames(
                councilInfo.Green_Infrastructure_classification === 'high' ||
                  councilInfo.Green_Infrastructure_classification === 'very high'
                  ? ' bg-indigo-700'
                  : ' bg-indigo-400',
                'bold-intro-sm inline-flex justify-center rounded-full border border-transparent py-4 px-4 uppercase text-white-200 shadow-sm',
              )}
            >
              {councilInfo.Green_Infrastructure_classification}
            </span>
            <p className='book-intro-sm pt-4'>Risk due to existing green infrastructure</p>
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
