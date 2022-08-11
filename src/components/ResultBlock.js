import React from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ResultBlock(props) {
  return (
    <div
      className={classNames(
        props.type === 'typology' ? 'border-green-600 ' : 'border-indigo-600',
        'bg-white-200  px-20 py-10 rounded-3xl border',
      )}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div>
          <h3 className=''>{props.title}</h3>
        </div>
        <div>
          <p className='book-intro-sm text-dark-wood-800 max-w-sm'>{props.description}</p>
        </div>
      </div>
      {props.children}
    </div>
  );
}

ResultBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
};
