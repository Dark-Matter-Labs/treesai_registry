import React, { Fragment } from 'react';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function InfoPanel(props) {
  return (
    <Transition.Root show={props.show} as={Fragment} className='bg-white-200 w-5/12 mt-16 rounded-r-[30px]'>
      <Transition.Child
        enter='transform transition ease-in-out duration-500 sm:duration-700'
        enterFrom='translate-x-full'
        enterTo='translate-x-0'
        leave='transform transition ease-in-out duration-500 sm:duration-700'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div className=''>
          <div className='px-4 py-4 bg-green-600 flex flex-row items-center my-auto justify-between rounded-tr-[30px]'>
            <div>
              <span className='bold-intro-md text-white-200 pl-6'>Explore Guide</span>
            </div>
            <div className=''>
              <button onClick={() => props.setShowPanel(false)}>
                <ArrowCircleLeftIcon className='text-white-200 w-7 h-7' />
              </button>
            </div>
          </div>
          <div className='px-10 py-4 text-dark-wood-700 medium-intro-sm '>
            <p>
              Explore every nature-based solutions projects on the TreesAI platform. Use the NbS Map
              to select and deselect projects, or use the filters to find a specific project.
            </p>
          </div>

          <div className='px-4 py-0 lg:py-8 bottom-0'>
            <div className='block lg:flex lg:flex-row gap-4'>
              <div>
                <Link to='/invest'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-2 lg:px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
                  >
                    Invest in Portfolio
                  </button>
                </Link>
              </div>

              <div>
                <Link to='/develop'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-12 text-white-200 shadow-sm hover:bg-green-800'
                  >
                    Submit a project →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

InfoPanel.propTypes = {
  show: PropTypes.bool,
  setShowPanel: PropTypes.func,
};
