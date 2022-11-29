import PropTypes from 'prop-types';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RadioGroupSelector(props) {
  return (
    <div className={props.span}>
      <RadioGroup value={props.value} onChange={props.setValue}>
        <div className='mt-4 grid grid-cols-1 gap-y-6 xl:grid-cols-3 sm:gap-x-4'>
          {props.valueArray.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
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
                    {props.hasImage && <img className='h-24 rounded-full' src={option.image} />}
                    <span className='flex flex-col'>
                      <RadioGroup.Label
                        as='span'
                        className='bold-intro-sm block border-b border-dark-wood-800 pb-2 uppercase text-dark-wood-600'
                      >
                        {option.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as='span'
                        className='book-info-sm mt-1 flex items-center pt-2 pl-2 text-dark-wood-600'
                      >
                        {option.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600')}
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
  );
}

RadioGroupSelector.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  valueArray: PropTypes.array,
  hasImage: PropTypes.bool,
  span: PropTypes.string,
};
