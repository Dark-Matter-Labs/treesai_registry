import React from 'react';
import PropTypes from 'prop-types';

export default function Breadcrumb(props) {
  return (
    <nav
      className='flex bg-white-200 rounded-full shadow-md px-8 py-4 my-4'
      aria-label='Breadcrumb'
    >
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div className='flex items-center'>
            <span className='mr-4 book-info-md text-dark-wood-600'>Impact Explorer</span>
            <svg
              className='h-5 w-5 flex-shrink-0 text-dark-wood-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
            </svg>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <span className='mr-4 book-info-md text-dark-wood-800 hover:text-gray-700'>
              {props.title}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  title: PropTypes.string,
};
