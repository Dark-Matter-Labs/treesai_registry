import React from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FormHeader(props) {
  return (
    <div
      className={classNames(
        props.type === 'typology' ? 'bg-green-600 ' : 'bg-indigo-600',
        'p-5 title-box-info max-w-2xl flex justify-center mx-auto',
      )}
    >
      <h2 className='text-white-200'>{props.title}</h2>
    </div>
  );
}

FormHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};
