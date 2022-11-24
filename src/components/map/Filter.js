import React, { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import FilterSelect from './FilterSelect';
import PropTypes from 'prop-types';
import { get_districts, get_typologies, get_stages } from '../../utils/map_filters';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const stages = get_stages();
const districts = get_districts();
const typologies = get_typologies();

export default function Filter(props) {
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [stage, setStage] = useState([]);
  const [district, setDistrict] = useState([]);
  const [typology, setTypology] = useState([]);

  useEffect(() => {
    if (stage.length !== 0 || district.length !== 0 || typology.length !== 0) {
      setFilterEnabled(true);
    } else {
      setFilterEnabled(false);
    }
  }, [stage, district, typology]);

  return (
    <Popover className='relative z-50'>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              filterEnabled ? 'bg-green-600' : 'bg-dark-wood-800',
              'text-white-200 control-panel rounded-[30px] medium-intro-sm focus:outline-none',
            )}
          >
            <div className='group inline-flex items-center '>
              {filterEnabled ? (
                <span className=''>Filters enabled</span>
              ) : (
                <span className=''>Filters</span>
              )}

              <ChevronDownIcon
                className={classNames(open ? 'text-white-200' : 'text-white-300', 'ml-2 h-5 w-5')}
                aria-hidden='true'
              />
            </div>

            {filterEnabled && (
              <div className='pt-1 border-t'>
                {stage.length + district.length + typology.length > 1 ? (
                  <p>{stage.length + district.length + typology.length} projects found.</p>
                ) : (
                  <p>{stage.length + district.length + typology.length} project found.</p>
                )}
              </div>
            )}
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
              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div
                  className={classNames(
                    filterEnabled ? 'bg-green-600' : 'bg-dark-wood-800',
                    'relative grid px-5 py-4 gap-2 rounded-30',
                  )}
                >
                  <FilterSelect
                    name='stage'
                    value={stage}
                    title='Filter by Stage'
                    options={stages}
                    onChange={(e) => {
                      setStage(e);
                      let filteredData = [];
                      e.map((selection) => {
                        let filteredDataRow = [];
                        filteredDataRow = props.projects.filter((item) =>
                          item.properties.stage.includes(selection.value),
                        );
                        filteredDataRow.map((element) => filteredData.push(element));
                      });
                      if (filteredData.length === 0) {
                        props.setData(props.projects);
                      } else {
                        props.setData(filteredData);
                      }
                    }}
                  />
                  <FilterSelect
                    name='district'
                    value={district}
                    title='Filter by District'
                    options={districts}
                    onChange={(e) => {
                      setDistrict(e);
                      let filteredData = [];
                      e.map((selection) => {
                        let filteredDataRow = [];
                        filteredDataRow = props.projects.filter((item) =>
                          item.properties.community_council.includes(selection.value),
                        );
                        filteredDataRow.map((element) => filteredData.push(element));
                      });
                      if (filteredData.length === 0) {
                        props.setData(props.projects);
                      } else {
                        props.setData(filteredData);
                      }
                    }}
                  />
                  <FilterSelect
                    label='typology'
                    value={typology}
                    title='Filter by Typology'
                    options={typologies}
                    onChange={(e) => {
                      setTypology(e);
                      let filteredData = [];
                      e.map((selection) => {
                        let filteredDataRow = [];
                        filteredDataRow = props.projects.filter((item) =>
                          item.properties.typology.includes(selection.value),
                        );
                        filteredDataRow.map((element) => filteredData.push(element));
                      });
                      if (filteredData.length === 0) {
                        props.setData(props.projects);
                      } else {
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
