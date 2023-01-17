import React, { Fragment } from 'react';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function InfoPanel(props) {
  return (
    <Transition.Root
      show={props.show}
      as={Fragment}
      className='bg-white-200 max-w-md mt-16 rounded-r-[30px]'
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
          {props.layer === 'Basic' && (
            <>
              <div className='px-10 py-4 text-dark-wood-700 medium-intro-sm '>
                <p>
                  Explore Nature-based Solutions projects on the TreesAI platform - either through
                  the map to the right or the table below.
                </p>
                <p className='pt-2'>
                  Use the map to select and deselect projects, or use the search bar or filters to
                  find projects.
                </p>
                <hr className='border-green-600 my-4' />
                <p className=''>
                  If you want to add your project you can register or login, upload data and see it
                  on this map.
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
                        Glasgow Pilot
                      </button>
                    </Link>
                  </div>

                  <div>
                    <Link to='/develop'>
                      <button
                        type='button'
                        className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-12 text-white-200 shadow-sm hover:bg-green-800'
                      >
                        Submit a project
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
          {props.layer === 'Social Deprivation' && (
            <div className='px-10 py-4   '>
              <p className='text-green-600 medium-intro-sm'>Multiple Deprivation</p>
              <p className='pt-2 book-intro-sm text-dark-wood-700'>
                SIMD - Scottish Government, 2020{' '}
              </p>
              <p className='medium-intro-sm pt-2 text-dark-wood-700 '>
                The Scottish Index of Multiple Deprivation is a relative measure of deprivation
                across 6,976 small areas (called data zones). If an area is identified as
                ‘deprived’, this can relate to people having a low income but it can also mean fewer
                resources or opportunities. SIMD looks at the extent to which an area is deprived
                across seven domains: income, employment, education, health, access to services,
                crime and housing.
              </p>
              <p className='pb-4 medium-intro-sm pt-4 text-dark-wood-700 '>
                For more information:
                https://www.gov.scot/collections/scottish-index-of-multiple-deprivation-2020/
              </p>

              <div className='bg-gradient-to-r from-[#2c7bb6] via-[#edf7c9] to-[#d7191c] px-10 py-2'></div>
              <div className='flex justify-between'>
                <p className='bold-intro-sm text-dark-wood-700'>Least Deprived</p>
                <p className='bold-intro-sm text-dark-wood-700'>Most Deprived</p>
              </div>
            </div>
          )}

          {props.layer === 'Sub Basin' && (
            <div className='px-10 py-4   '>
              <p className='text-green-600 medium-intro-sm'>Subbasin</p>
              <p className='pt-2 book-intro-sm text-dark-wood-700'>
                Produced by TreeAI team using a DEM
              </p>
              <p className='medium-intro-sm pt-2 text-dark-wood-700 '>
                This subbasin map shows the drainage catchment that receives rainfall during a storm
                event. This maps is used for hydrological studies to define the watershed
                delineation.
              </p>
            </div>
          )}

          {props.layer === 'mapbox://styles/gurden/cla6q7i2y00fb15ph0j37y0b4' && (
            <div className='px-10 py-4   '>
              <p className='text-green-600 medium-intro-sm'>Canopy Cover</p>
              <p className='pt-2 book-intro-sm text-dark-wood-700'>
                Clydeplan, Forest Research and Clyde Climate Forest, 2022
              </p>
              <p className='medium-intro-sm pt-2 text-dark-wood-700 '>
                The dataset is an interpretation of high resolution aerial photography specifically
                commissioned for the purpose of generating a tree canopy dataset using a method
                developed by Forest Research. The full methodology is provided.
              </p>
            </div>
          )}
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

InfoPanel.propTypes = {
  show: PropTypes.bool,
  setShowPanel: PropTypes.func,
  layer: PropTypes.string,
};
