import PropTypes from 'prop-types';
import React from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddressInput(props) {
  const { register } = useFormContext();
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md pl-5 text-dark-wood-800'>
        {props.title}
      </label>
      <div className='mt-1'>
        {/* TODO: geolock to only Scotland, and store convert response to lat,lng */}
        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_KEY}>
          <input
            {...register(props.label, {
              required: { value: props.required, message: 'This is required!' },
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
            autoComplete='street-address'
            options={{
              language: 'en',
              country: 'UK',
            }}
          />
        </AddressAutofill>
        <ErrorMessage
          name={props.label}
          render={({ message }) => <p className='book-info-sm text-red-600 py-2'>{message}</p>}
        />
      </div>
    </div>
  );
}

AddressInput.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
