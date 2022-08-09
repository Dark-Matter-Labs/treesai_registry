import PropTypes from 'prop-types';
import React from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RadioSelector(props) {
  return (
    <div className={props.span}>
      <div className='flex items-center justify-between'></div>
      <label htmlFor={props.label} className='book-info-md text-dark-wood-800 pl-5'>
        {props.title}
      </label>
      <RadioGroup value={props.radioType} onChange={props.setRadioType} className='mt-2'>
        <RadioGroup.Label className='sr-only'>{props.title}</RadioGroup.Label>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
          {props.radioTypes.map((option) =>
            props.type === 'typology' ? (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    option.enabled
                      ? 'cursor-pointer focus:outline-none'
                      : 'opacity-25 cursor-not-allowed',
                    active ? 'ring-2 ring-offset-2 ring-green-600' : '',
                    checked
                      ? 'bg-green-600 border-transparent text-white hover:bg-green-700'
                      : 'bg-white border-dark-wood-500 text-gray-900 hover:bg-gray-50',
                    'border  rounded-full py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                  )
                }
                disabled={!option.enabled}
              >
                <RadioGroup.Label as='span'>{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ) : (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    option.enabled
                      ? 'cursor-pointer focus:outline-none'
                      : 'opacity-25 cursor-not-allowed',
                    active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                    checked
                      ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                      : 'bg-white border-dark-wood-500 text-gray-900 hover:bg-gray-50',
                    'border  rounded-full py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                  )
                }
                disabled={!option.enabled}
              >
                <RadioGroup.Label as='span'>{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ),
          )}
        </div>
      </RadioGroup>
    </div>
  );
}

RadioSelector.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  setRadioType: PropTypes.func,
  radioType: PropTypes.object,
  radioTypes: PropTypes.array,
};
