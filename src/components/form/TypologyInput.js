import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/solid';
import NumberInput from './NumberInput';
import RadioSelector from './RadioSelector';
import SectionHeader from '../SectionHeader';
import FormBlock from './FormBlock';

import { get_typologies_types } from '../../utils/project_details';

const typologyTabs = get_typologies_types();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TypologyInput(props) {
  return (
    <div className='py-10'>
      <SectionHeader title='Project Layout *' type='typology' />
      <FormBlock
        title='Select the relevant typology'
        description='We know that projects can be made up of multiple types of nature-based solutions. Please, select the typologies that you will develop in your project. Right now, the platform only recognises tree-based projects, but we’ll soon add more typologies such as Sustainable Urban Drainage Systems (SuDS)'
        type='typology'
      >
        <div className='sm:hidden'>
          <label htmlFor='typology-type' className='sr-only'>
            Select a tab
          </label>
          <select
            id='typology-type'
            name='typology-type'
            className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            defaultValue={typologyTabs.find((tab) => tab.current).name}
          >
            {typologyTabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className='col-span-4 hidden justify-self-center sm:block'>
          <nav className='flex space-x-4' aria-label='Tabs'>
            {typologyTabs.map((tab) => (
              <button
                key={tab.name}
                className={classNames(
                  tab.current
                    ? 'bg-green-600 text-white'
                    : 'pointer-events-none bg-white-300 text-dark-wood-500',
                  'bold-intro-md rounded-full px-4 py-4',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className='col-span-5'>
          <RadioGroup value={props.selectedTypology} onChange={props.setSelectedTypology}>
            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
              {props.typologies.map((typology) => (
                <RadioGroup.Option
                  key={typology.id}
                  value={typology}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? 'border-transparent' : 'border-dark-wood-500',
                      active ? 'border-green-600 ring-2 ring-green-600' : '',
                      'relative flex cursor-pointer rounded-3xl border bg-white p-4 focus:outline-none',
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <span className='flex flex-1'>
                        <img className='h-24 rounded-full' src={typology.image} />
                        <span className='flex flex-col'>
                          <RadioGroup.Label
                            as='span'
                            className='bold-intro-sm block border-b border-dark-wood-800 pb-2 uppercase text-dark-wood-600'
                          >
                            {typology.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as='span'
                            className='book-info-sm mt-1 flex items-center pt-2 pl-2 text-dark-wood-600'
                          >
                            {typology.description}
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <CheckCircleIcon
                        className={classNames(
                          !checked ? 'invisible' : '',
                          'h-5 w-5 text-green-600',
                        )}
                        aria-hidden='true'
                      />
                      <span
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-green-600' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-3xl',
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </FormBlock>
      <hr className='mx-20 border-8 border-green-600' />
      <FormBlock
        title={`How big is the ${props.selectedTypology.title} component of your project?`}
        description={`How much of that will be comprised of ${props.selectedTypology.title}, and how many trees will there be?`}
        type='typology'
      >
        {props.selectedTypology.id !== 0 && (
          <>
            <NumberInput
              span='sm:col-span-3'
              label='area-density'
              title='The effective area used by typology'
              unit='Ha'
              placeholder=''
              type='typology'
              defaultValue={props.areaDensity}
              onChange={(e) => {
                props.setAreaDensity(e.target.value);
              }}
            />
            <div className='col-span-3'></div>
          </>
        )}

        <NumberInput
          span='sm:col-span-3'
          label='new-trees'
          title='Number of new trees to be planted'
          placeholder='100'
          type='typology'
          unit='trees'
          defaultValue={props.treeNumber}
          onChange={(e) => {
            props.setTreeNumber(e.target.value);
          }}
        />
        {(props.selectedTypology.id === 1 || props.selectedTypology.id === 2) && (
          <NumberInput
            span='sm:col-span-3'
            label='existing-trees'
            unit='trees'
            title='Number of existing trees to be maintained'
            placeholder='100'
            type='typology'
            defaultValue={props.treeNumberMaintain}
            onChange={(e) => {
              props.setTreeNumberMaintain(e.target.value);
            }}
          />
        )}
      </FormBlock>
      <hr className='mx-20 border-8 border-green-600' />
      <FormBlock
        title='What activities are you planning?'
        description='While we imagine you’re planning several activities, please select the main ones. (If you’re planning to plant trees, select DEVELOPING. If you’re maintaining existing tree stocks, select MAINTAINING)'
        type='typology'
      >
        <RadioSelector
          span='sm:col-span-5'
          label='activity-type'
          title='Primary activity'
          type='typology'
          setRadioType={props.setActivityType}
          radioType={props.activityType}
          radioTypes={props.activityTypes}
        />
        <RadioSelector
          span='sm:col-span-5'
          label='maintenance-type'
          title='Maintenance level'
          type='typology'
          setRadioType={props.setMaintenanceType}
          radioType={props.maintenanceType}
          radioTypes={props.maintenanceTypes}
        />
      </FormBlock>
    </div>
  );
}

TypologyInput.propTypes = {
  selectedTypology: PropTypes.object,
  setSelectedTypology: PropTypes.func,
  typologies: PropTypes.array,
  areaDensity: PropTypes.number,
  setAreaDensity: PropTypes.func,
  treeNumber: PropTypes.number,
  setTreeNumber: PropTypes.func,
  treeNumberMaintain: PropTypes.number,
  setTreeNumberMaintain: PropTypes.func,
  setActivityType: PropTypes.func,
  activityType: PropTypes.object,
  activityTypes: PropTypes.array,
  setMaintenanceType: PropTypes.func,
  maintenanceType: PropTypes.object,
  maintenanceTypes: PropTypes.array,
};
