import PropTypes from 'prop-types';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md text-dark-wood-800 pl-5'>
        {props.title}
      </label>
      <div className='mt-1'>
        <select
          id={props.label}
          name={props.label}
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full medium-intro-sm rounded-2xl',
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
};
