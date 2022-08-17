import PropTypes from 'prop-types';
import React from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddressInput(props) {
  return (
    <div className={props.span}>
      <label htmlFor={props.label} className='book-info-md text-dark-wood-800 pl-5'>
        {props.title}
      </label>
      <div className='mt-1'>
        {/* TODO: geolock to only Scotland, and store convert response to lat,lng */}
        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_KEY}>
          <input
            type='text'
            name={props.label}
            id={props.label}
            placeholder={props.placeholder}
            className={classNames(
              props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
              'shadow-sm block w-full rounded-2xl medium-intro-sm py-2',
            )}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            autoComplete='street-address'
          />
        </AddressAutofill>
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
};
