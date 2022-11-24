import PropTypes from 'prop-types';
import React, { useState, useRef, useMemo } from 'react';
import {
  ArrowCircleRightIcon,
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
} from '@heroicons/react/outline';
import ProjectsJSON from '../data/NbS_projects_database.json';
import NbSMap from '../components/map/NbSMap';
import NavBar from '../components/NavBar';
import InfoPanel from '../components/map/InfoPanel';
import ProjectsTable from '../components/map/ProjectsTable';
import Filter from '../components/map/Filter';
import DataLayerSelector from '../components/map/DataLayerSelector';
export default function Explore(props) {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [projects, setProjects] = useState(ProjectsJSON);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [mapDataLayer, setMapDataLayer] = useState('Basic');
  const [mapHeight, setMapHeight] = useState('65vh');
  const [tableHeight, setTableHeight] = useState('35vh');

  const columns = useMemo(
    () => [
      {
        Header: 'projects',
        columns: [
          {
            Header: 'Code',
            accessor: 'properties.id',
          },
          {
            Header: 'Project name',
            accessor: 'properties.project_name',
          },
          {
            Header: 'Project Developer',
            accessor: 'properties.project_developer',
          },
          {
            Header: 'Project city',
            accessor: 'properties.project_city',
          },
          {
            Header: 'Stage',
            accessor: 'properties.stage',
          },
          {
            Header: 'Typologies',
            accessor: 'properties.typology',
          },
          {
            Header: 'Activities',
            accessor: 'properties.activity',
          },
          {
            Header: 'Total Area',
            accessor: 'properties.total_area',
          },
          {
            Header: 'Estimated project costs',
            accessor: 'properties.project_budget',
          },
          {
            Header: 'Coordinates',
            accessor: 'geometry.coordinates',
          },
        ],
      },
    ],
    [],
  );

  const selectProject = (current) => {
    mapRef.current.flyTo({
      center: [current.geometry.coordinates[0], current.geometry.coordinates[1]],
      duration: 2000,
      zoom: 12,
    });
    setPopupInfo(current);
  };
  return (
    <div className='overflow-hidden h-screen m-0'>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      {showInfoPanel ? (
        <div className='relative'>
          <div className='absolute z-20'>
            <InfoPanel show={showInfoPanel} setShowPanel={setShowInfoPanel} />
          </div>
          <div className=''>
            <Filter projects={ProjectsJSON} setData={setProjects} />
            <DataLayerSelector setMapDataLayer={setMapDataLayer} />
            <NbSMap
              mapRef={mapRef}
              data={projects}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              mapDataLayer={mapDataLayer}
              height={mapHeight}
            />
          </div>
          <div className='absolute z-40'>
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
                    setMapHeight('65vh');
                    setTableHeight('35vh');
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
      ) : (
        <div className='relative'>
          <div className='absolute z-50 top-1/4'>
            <div className='px-4 py-10 bg-green-600 rounded-r-full'>
              <button onClick={() => setShowInfoPanel(true)}>
                <ArrowCircleRightIcon className='text-white-200 w-7 h-7 ml-2' />
              </button>
            </div>
          </div>
          <div className=''>
            <Filter projects={ProjectsJSON} setData={setProjects} />
            <DataLayerSelector setMapDataLayer={setMapDataLayer} />
            <NbSMap
              mapRef={mapRef}
              data={projects}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              mapDataLayer={mapDataLayer}
              height={mapHeight}
            />
          </div>
          <div className='absolute z-40'>
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
                    setMapHeight('65vh');
                    setTableHeight('35vh');
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
      )}
    </div>
  );
}

Explore.propTypes = {
  loggedIn: PropTypes.bool,
};
