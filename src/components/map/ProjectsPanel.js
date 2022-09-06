import React, { Fragment } from 'react';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectsPanel(props) {
  return (
    <Transition.Root show={props.showProjectPanel} as={Fragment}>
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
          <button onClick={() => props.setShowProjectPanel(false)}>
            <ArrowCircleLeftIcon className='text-white-200 w-7 h-7 ml-2' />
          </button>
        </div>

        <ul role='list' className='overflow-scroll h-screen'>
          {props.data.map((project) => (
            <li
              key={project.properties.id}
              className={classNames(
                project.properties.is_featured ? 'bg-green-100' : 'bg-white-300',
                'relative  py-5 px-4 hover:bg-gray-50 rounded-full border border-green-600 my-4 mx-2',
              )}
              onClick={() => {
                props.selectProject(project);
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
  );
}

ProjectsPanel.propTypes = {
  showProjectPanel: PropTypes.bool,
  setShowProjectPanel: PropTypes.func,
  selectProject: PropTypes.func,
  data: PropTypes.array,
};
