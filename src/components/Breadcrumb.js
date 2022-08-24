import React from 'react';

const pages = [
  { name: 'Upload your project', href: '#', current: true },
  { name: 'Project Information', href: '#', current: true },
];

export default function Breadcrumb() {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol role='list' className='mt-5 flex items-center space-x-4'>
        {pages.map((page) => (
          <li key={page.name}>
            <div className='flex items-center'>
              <a
                href={page.href}
                className='mr-4 text-sm font-medium text-gray-500 hover:text-gray-700'
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
              <svg
                className='h-5 w-5 flex-shrink-0 text-gray-300'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
                aria-hidden='true'
              >
                <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
              </svg>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
