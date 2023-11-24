import PropTypes from 'prop-types';
/* --- Components --- */
import React, { useState, useRef } from 'react';
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/outline';
import NbSMap from './NbSMap';
import DataLayerSelector from './DataLayerSelector';


/* --- Main --- */
export default function FilterMapTable({ mapLayer, setMapLayer, setShowPanel }) {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);

  const [mapHeight, setMapHeight] = useState('90vh');
  const [tableHeight, setTableHeight] = useState('0vh');


  const selectProject = (current) => {
    mapRef.current.flyTo({
      center: [current.lng, current.lat],
      duration: 2000,
      zoom: 12,
    });
    setPopupInfo(current);
  };

    return (
      <div className='overflow-hidden h-screen m-0'>
        <div className=''>
          <DataLayerSelector setMapDataLayer={setMapLayer} />
          <NbSMap
            mapRef={mapRef}
            selectProject={selectProject}
            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
            mapDataLayer={mapLayer}
            height={mapHeight}
          />
        </div>
        <div className='absolute z-40 left-0 right-0'>
          <div className='px-4 py-2 bg-green-600 flex flex-row items-center my-auto rounded-tr-[30px]'>
            <div>
              <span className='bold-intro-md text-white-200 pl-6'>Project Details</span>
            </div>
            <div className=''>
              <button
                onClick={() => {
                  setMapHeight('20vh');
                  setTableHeight('80vh');
                  setShowPanel(false);
                }}
              >
                <ArrowCircleUpIcon className='text-white-200 w-7 h-7' />
              </button>
              <button
                onClick={() => {
                  if (tableHeight === '80vh') {
                    setMapHeight('65vh');
                    setTableHeight('35vh');
                  } else {
                    setMapHeight('80vh');
                    setTableHeight('20vh');
                  }
                }}
              >
                <ArrowCircleDownIcon className='text-white-200 w-7 h-7' />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

FilterMapTable.propTypes = {
  setMapLayer: PropTypes.func,
  mapLayer: PropTypes.string,
  setShowPanel: PropTypes.func,
};
