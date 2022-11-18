import PropTypes from 'prop-types';
import React from 'react';
import InfoSlideOver from './InfoSlideOver';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown(props) {
  return (
    <div className={props.span}>
      <label
        htmlFor={props.label}
        className={classNames(
          props.type === 'map' ? 'text-white-200' : 'text-dark-wood-800',
          'book-info-md mx-4',
        )}
      >
        {props.title}
      </label>
      {props.showInfo && <InfoSlideOver />}
      <div className='mt-1'>
        <select
          id={props.label}
          name={props.label}
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'medium-intro-sm block w-full rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
          )}
          onChange={props.onChange}
        >
          {props.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  showInfo: PropTypes.bool,
};
