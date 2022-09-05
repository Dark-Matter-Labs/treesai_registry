import PropTypes from 'prop-types';
import React, { useState, useRef, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import ProjectsJSON from '../data/NbS_projects_database.json';
import NbSMap from '../components/map/NbSMap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Dropdown from '../components/form/Dropdown';
import { get_stages } from '../utils/project_details';

const stages = ['All'].concat(get_stages());
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Portfolio(props) {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(ProjectsJSON);
  const [showProjectPanel, setShowProjectPanel] = useState(true);

  const selectProject = (current) => {
    mapRef.current.flyTo({
      center: [current.geometry.coordinates[0], current.geometry.coordinates[1]],
      duration: 2000,
      zoom: 13,
    });
    setPopupInfo(current);
  };

  return (
    <>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      {showProjectPanel ? (
        <div className='grid grid-cols-1 sm:grid-cols-3'>
          <div>
            <Transition.Root show={showProjectPanel} as={Fragment}>
              <Transition.Child
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <div className='px-4 py-10 bg-green-600 rounded-tr-full flex flex-row items-center'>
                  <span className='bold-intro-md uppercase text-white-200 pl-10'>NbS Atlas</span>
                  <button onClick={() => setShowProjectPanel(false)}>
                    <ArrowCircleLeftIcon className='text-white-200 w-7 h-7 ml-2' />
                  </button>
                </div>

                <ul role='list' className='overflow-scroll h-screen'>
                  {data.map((project) => (
                    <li
                      key={project.properties.id}
                      className={classNames(
                        project.properties.is_featured ? 'bg-green-100' : 'bg-white-300',
                        'relative  py-5 px-4 hover:bg-gray-50 rounded-full border border-green-600 my-4 mx-2',
                      )}
                      onClick={() => {
                        selectProject(project);
                      }}
                    >
                      <div className='flex justify-between space-x-3'>
                        <div className='min-w-0 flex-1'>
                          <a href='#' className='block focus:outline-none'>
                            <span className='absolute inset-0' aria-hidden='true' />
                            <p className='medium-intro-md text-gray-900 truncate'>
                              {project.properties.project_name}
                            </p>
                            <p className='medium-intro-sm text-gray-500 truncate'>
                              {project.properties.stage}
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className='mt-1'>
                        <p className='line-clamp-2 medium-intro-sm text-green-600'>
                          {project.properties.typology}
                        </p>
                      </div>
                      {project.properties.is_featured && (
                        <div className='mt-1'>
                          <p className='line-clamp-2 medium-intro-sm text-green-800'>Featured</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Transition.Child>
            </Transition.Root>
          </div>
          <div className='col-span-2'>
            <Popover className='relative z-50'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'control-panel group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    )}
                  >
                    <span>Filters</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute right-0 mt-20 z-10 mt-3 w-screen max-w-xs  transform px-2 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                          <Dropdown
                            span='sm:col-span-3'
                            label='city'
                            title='Filter by Stage'
                            type='general'
                            options={stages}
                            onChange={(e) => {
                              if (e.target.value === 'All') {
                                setData(ProjectsJSON);
                              } else {
                                const filteredData = ProjectsJSON.filter((item) =>
                                  item.properties.stage.includes(e.target.value),
                                );
                                setData(filteredData);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <NbSMap
              mapRef={mapRef}
              data={data}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
            />
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
            <Popover className='relative z-50 mr-20'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'control-panel group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900',
                    )}
                  >
                    <span>Filters</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute right-0 mt-20 z-10 mt-3 w-screen max-w-xs  transform px-2 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                          <Dropdown
                            span='sm:col-span-3'
                            label='city'
                            title='Filter by Stage'
                            type='general'
                            options={stages}
                            onChange={(e) => {
                              if (e.target.value === 'All') {
                                setData(ProjectsJSON);
                              } else {
                                const filteredData = ProjectsJSON.filter((item) =>
                                  item.properties.stage.includes(e.target.value),
                                );
                                setData(filteredData);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <NbSMap
              mapRef={mapRef}
              data={data}
              selectProject={selectProject}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
            />
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
