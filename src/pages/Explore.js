import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import NavBar from '../components/NavBar';
import FilterMapTable from '../components/map/FilterMapTable';
import InfoPanel from '../components/map/InfoPanel';

export default function Explore(props) {
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  return (
    <div className='overflow-hidden h-screen m-0'>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      {showInfoPanel ? (
        <div className='relative'>
          <div className='absolute z-20'>
            <InfoPanel show={showInfoPanel} setShowPanel={setShowInfoPanel} />
          </div>
          <FilterMapTable />
        </div>
      ) : (
        <div className='relative'>
          <div className='absolute z-20 top-1/4'>
            <div className='px-4 py-10 bg-green-600 rounded-r-full'>
              <button onClick={() => setShowInfoPanel(true)}>
                <ArrowCircleRightIcon className='text-white-200 w-7 h-7 ml-2' />
              </button>
            </div>
          </div>
          <FilterMapTable />
        </div>
      )}
    </div>
  );
}

Explore.propTypes = {
  loggedIn: PropTypes.bool,
};
