import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TextInput(props) {
  const { register } = useFormContext();
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md pl-5 text-dark-wood-800'>
        {props.title}
      </label>
      <div className='mt-1'>
        <input
          {...register(props.label, {
            required: { value: props.required, message: 'This is required!' },
            maxLength: 80,
          })}
          type='text'
          name={props.label}
          id={props.label}
          placeholder={props.placeholder}
          className={classNames(
            props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
            'medium-intro-sm block w-full rounded-2xl py-2 shadow-sm',
          )}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
        <ErrorMessage
          name={props.label}
          render={({ message }) => <p className='book-info-sm text-red-600 py-2'>{message}</p>}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.object,
  required: PropTypes.bool,
  errors: PropTypes.object,
};
