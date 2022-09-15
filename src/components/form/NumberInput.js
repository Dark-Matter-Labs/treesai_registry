import PropTypes from 'prop-types';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NumberInput(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md pl-5 text-dark-wood-800'>
        {props.title}
      </label>
      <div className='mt-1 flex'>
        <input
          type='number'
          name={props.label}
          id={props.label}
          placeholder={props.placeholder}
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'medium-intro-sm block w-full flex-1 rounded-l-2xl py-2 shadow-sm',
          )}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          onWheel={(e) => e.target.blur()}
          min='1'
        />
        <span
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'medium-intro-sm inline-flex items-center rounded-r-2xl border px-3 py-2 text-dark-wood-800',
          )}
        >
          {props.unit}
        </span>
      </div>
    </div>
  );
}

NumberInput.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.number,
  unit: PropTypes.string,
  onChange: PropTypes.func,
};
