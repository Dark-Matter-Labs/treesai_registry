import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Dropdown from '../form/Dropdown';
import PropTypes from 'prop-types';
import { get_stages } from '../../utils/project_details';
import { get_districts, get_typologies } from '../../utils/map_filters';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const stages = ['All'].concat(get_stages());
const districts = ['All'].concat(get_districts());
const typologies = ['All'].concat(get_typologies());

export default function Filter(props) {
  return (
    <Popover className='relative z-50'>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-white-200' : 'text-white-200',
              'control-panel group inline-flex items-center rounded-md bg-dark-wood-800 medium-intro-sm focus:outline-none',
            )}
          >
            <span>Filters</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-white-200' : 'text-white-300', 'ml-2 h-5 w-5')}
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
            <Popover.Panel className='absolute right-0 mt-20 z-10 mt-3 w-screen max-w-xs transform px-2 sm:px-0'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative grid  bg-dark-wood-800 px-5 py-4 gap-2'>
                  <Dropdown
                    span='sm:col-span-3'
                    label='city'
                    title='Filter by Stage'
                    type='map'
                    options={stages}
                    onChange={(e) => {
                      if (e.target.value === 'All') {
                        props.setData(props.projects);
                      } else {
                        const filteredData = props.projects.filter((item) =>
                          item.properties.stage.includes(e.target.value),
                        );
                        props.setData(filteredData);
                      }
                    }}
                  />
                  <Dropdown
                    span='sm:col-span-3'
                    label='city'
                    title='Filter by District'
                    type='map'
                    options={districts}
                    onChange={(e) => {
                      if (e.target.value === 'All') {
                        props.setData(props.projects);
                      } else {
                        const filteredData = props.projects.filter((item) =>
                          item.properties.community_council.includes(e.target.value),
                        );
                        props.setData(filteredData);
                      }
                    }}
                  />
                  <Dropdown
                    span='sm:col-span-3'
                    label='city'
                    title='Filter by Typology'
                    type='map'
                    options={typologies}
                    onChange={(e) => {
                      if (e.target.value === 'All') {
                        props.setData(props.projects);
                      } else {
                        const filteredData = props.projects.filter((item) =>
                          item.properties.typology.includes(e.target.value),
                        );
                        props.setData(filteredData);
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
  );
}

Filter.propTypes = {
  setData: PropTypes.func,
  projects: PropTypes.array,
};
