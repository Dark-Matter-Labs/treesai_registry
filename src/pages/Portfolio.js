import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import ProjectsJSON from '../data/NbS_projects_database.json';
import NbSMap from '../components/map/NbSMap';
import NavBar from '../components/NavBar';
import ProjectsPanel from '../components/map/ProjectsPanel';
import Filter from '../components/map/Filter';
import LayerSelector from '../components/map/LayerSelector';
import Footer from '../components/Footer';

export default function Portfolio(props) {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(ProjectsJSON);
  const [showProjectPanel, setShowProjectPanel] = useState(true);
  const [mapLayer, setMapLayer] = useState('mapbox://styles/mapbox/light-v10');

  const selectProject = (current) => {
    mapRef.current.flyTo({
      center: [current.geometry.coordinates[0], current.geometry.coordinates[1]],
      duration: 2000,
      zoom: 12,
    });
    setPopupInfo(current);
  };
  return (
    <>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      {showProjectPanel ? (
        <div className='grid grid-cols-1 sm:grid-cols-4'>
          <div className='col-span-1'>
            <ProjectsPanel
              showProjectPanel={showProjectPanel}
              setShowProjectPanel={setShowProjectPanel}
              selectProject={selectProject}
              data={data}
            />
          </div>
          <div className='col-span-3'>
            <Filter projects={ProjectsJSON} setData={setData} />
            <NbSMap
              mapRef={mapRef}
              data={data}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              mapLayer={mapLayer}
            />
            <LayerSelector setMapLayer={setMapLayer} />
          </div>
        </div>
      ) : (
        <div className='relative'>
          <div className='absolute z-50 top-96'>
            <div className='px-4 py-10 bg-green-600 rounded-r-full'>
              <button onClick={() => setShowProjectPanel(true)}>
                <ArrowCircleRightIcon className='text-white-200 w-7 h-7 ml-2' />
              </button>
            </div>
          </div>
          <div className=''>
            <Filter projects={ProjectsJSON} setData={setData} />
            <NbSMap
              mapRef={mapRef}
              data={data}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              mapLayer={mapLayer}
            />
            <LayerSelector setMapLayer={setMapLayer} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

Portfolio.propTypes = {
  loggedIn: PropTypes.bool,
};
