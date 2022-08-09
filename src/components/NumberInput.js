import PropTypes from 'prop-types';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NumberInput(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md text-dark-wood-800 pl-5'>
        {props.title}
      </label>
      <div className='mt-1'>
        <input
          type='number'
          name={props.label}
          id={props.label}
          placeholder={props.placeholder}
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'shadow-sm block w-full rounded-2xl medium-intro-sm py-2',
          )}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
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
  onChange: PropTypes.func,
};
