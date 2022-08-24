import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Toggle(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md pl-5 text-dark-wood-800'>
        {props.title}
      </label>
      <div className='mt-1 flex justify-center rounded-full  border border-indigo-600 py-2'>
        <span
          className={classNames(
            props.type === 'typology' ? 'text-green-600 ' : 'text-indigo-600',
            'bold-intro-md mr-2 uppercase',
          )}
        >
          {props.firstChoice}
        </span>
        <Switch
          checked={props.checked}
          onChange={props.onChange}
          className={classNames(
            props.checked ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          )}
        >
          <span className='sr-only'>{props.title}</span>
          <span
            aria-hidden='true'
            className={classNames(
              props.checked ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            )}
          />
        </Switch>
        <span
          className={classNames(
            props.type === 'typology' ? 'text-green-600' : 'text-indigo-600',
            'bold-intro-md ml-2 uppercase',
          )}
        >
          {props.secondChoice}
        </span>
      </div>
    </div>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  firstChoice: PropTypes.string,
  secondChoice: PropTypes.string,
};
