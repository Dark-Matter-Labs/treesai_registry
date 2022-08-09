import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Toggle(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md text-dark-wood-800 pl-5'>
        {props.title}
      </label>
      <div className='mt-1 border border-indigo-600 rounded-full  flex justify-center py-2'>
        <span
          className={classNames(
            props.type === 'typology' ? 'text-green-600 ' : 'text-indigo-600',
            'bold-intro-md uppercase mr-2',
          )}
        >
          {props.firstChoice}
        </span>
        <Switch
          checked={props.checked}
          onChange={props.onChange}
          className={classNames(
            props.checked ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          )}
        >
          <span className='sr-only'>{props.title}</span>
          <span
            aria-hidden='true'
            className={classNames(
              props.checked ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            )}
          />
        </Switch>
        <span
          className={classNames(
            props.type === 'typology' ? 'text-green-600' : 'text-indigo-600',
            'bold-intro-md uppercase ml-2',
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
