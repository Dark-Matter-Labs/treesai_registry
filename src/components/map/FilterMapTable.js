import PropTypes from 'prop-types';
/* --- Components --- */
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/outline';
import NbSMap from './NbSMap';
import ProjectsTable from './ProjectsTable';
import Filter from './Filter';
import DataLayerSelector from './DataLayerSelector';

/* --- Hooks --- */
import { useProjects } from '../../utils/explore_page_helper';
import { getExploreTableColumns } from '../../utils/table_helper';

/* --- Main --- */
export default function FilterMapTable({ mapLayer, setMapLayer }) {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [projects, setProjects] = useState();

  const [mapHeight, setMapHeight] = useState('65vh');
  const [tableHeight, setTableHeight] = useState('35vh');

  const columns = useMemo(() => getExploreTableColumns(), []);

  const { dBprojects } = useProjects();

  useEffect(() => {
    if (dBprojects) {
      setProjects(dBprojects);
    }
  }, [dBprojects]);

  const selectProject = (current) => {
    mapRef.current.flyTo({
      center: [current.lng, current.lat],
      duration: 2000,
      zoom: 12,
    });
    setPopupInfo(current);
  };

  if (projects) {
    return (
      <div className='overflow-hidden h-screen m-0'>
        <div className=''>
          <Filter projects={projects} setData={setProjects} />
          <DataLayerSelector setMapDataLayer={setMapLayer} />
          <NbSMap
            mapRef={mapRef}
            data={projects}
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
          <ProjectsTable
            data={projects}
            columns={columns}
            selectProject={selectProject}
            height={tableHeight}
          />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

FilterMapTable.propTypes = {
  setMapLayer: PropTypes.func,
  mapLayer: PropTypes.string,
};
