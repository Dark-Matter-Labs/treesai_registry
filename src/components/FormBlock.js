import React from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FormBlock(props) {
  return (
    <div
      className={classNames(
        props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
        'bg-white-200 mx-10 px-20 py-10 rounded-3xl border',
      )}
    >
      <div className='grid grid-cols-3 gap-12'>
        <div>
          <h3 className=''>{props.title}</h3>
          <p className='book-intro-sm pt-20 text-dark-wood-800 max-w-sm'>{props.description}</p>
        </div>
        <div className='col-span-2'>
          <form className='space-y-8 divide-y divide-gray-200'>
            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>{props.children}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

FormBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
};
