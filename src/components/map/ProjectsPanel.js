import React, { Fragment } from 'react';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectsPanel(props) {
  return (
    <Transition.Root
      show={props.showProjectPanel}
      as={Fragment}
      className='h-screen overflow-y-hidden'
    >
      <Transition.Child
        enter='transform transition ease-in-out duration-500 sm:duration-700'
        enterFrom='translate-x-full'
        enterTo='translate-x-0'
        leave='transform transition ease-in-out duration-500 sm:duration-700'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div className=''>
          <div className='px-4 py-4 bg-green-600 flex flex-row items-center'>
            <div>
            <span className='bold-intro-md uppercase text-white-200 pl-10'>NbS Atlas</span>
            </div>
            <div className='pl-72'>

            <button onClick={() => props.setShowProjectPanel(false)}>
              <ArrowCircleLeftIcon className='text-white-200 w-7 h-7' />
            </button>
            </div>
            

          </div>
          <div className='px-10 py-4 text-dark-wood-700 medium-intro-sm '>
            <p>
              Explore every nature-based solutions projects on the TreesAI platform.
              <br />
              <br />
              Use the NbS Map to select and deselect projects, or use the search icon to find a
              specific project.
            </p>
          </div>

          <div className='px-4 py-2'>
            <p className='text-green-600 bold-intro-md'>Projects</p>
            <ul role='list' className='overflow-scroll h-[15rem] sm:h-[20rem] lg:h-[27rem] xl:h-[42vh] styled-scrollbars '>
              {props.data.map((project) => {
                if (project.properties.portfolio_A) {
                  return (
                    <li
                      key={project.properties.id}
                      className={classNames(
                        project.properties.is_featured
                          ? 'border-green-600'
                          : 'border-dark-wood-600',
                        'bg-white-300 relative  py-5 px-4 hover:bg-gray-50 rounded-full border my-4 mx-2',
                      )}
                      onClick={() => {
                        props.selectProject(project);
                      }}
                    >
                      <div className='flex justify-between space-x-3'>
                        <div className='min-w-0 flex-1'>
                          <a href='#' className='block focus:outline-none'>
                            <span className='absolute inset-0' aria-hidden='true' />
                            <p className='medium-intro-sm text-green-600 truncate'>
                              {project.properties.project_name}
                            </p>
                            <p className='medium-intro-sm text-gray-500 truncate'>
                              {project.properties.community_council}
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className='px-4 py-4 place-self-stretch   xl:mb-20'>
            <Link to='/develop'>
              <button
                type='button'
                className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-12 text-white-200 shadow-sm hover:bg-green-800'
              >
                Add your project →
              </button>
            </Link>
            <p className='text-indigo-600 bold-intro-md pt-2'>Featured portfolios</p>
            <div className='bg-white-300 relative  py-5 px-4 hover:bg-gray-50 rounded-full border border-indigo-600 my-4 mx-2'>
              <div className='flex justify-between space-x-3'>
                <div className='min-w-0 flex-1'>
                  <a className='block focus:outline-none'>
                    <span className='absolute inset-0' aria-hidden='true' />
                    <p className='medium-intro-sm text-indigo-600 truncate'>TreesAI in Glasgow</p>
                  </a>
                </div>
              </div>
            </div>

            <div className='block lg:flex lg:flex-row gap-4'>
              <Link to='/invest'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
                >
                  Invest →
                </button>
              </Link>

              <Link to='/glasgow-nbs-portfolio'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800'
                >
                  Glasgow NbS Portfolio →
                </button>
              </Link>
            </div>
          </div>
        </div>
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
