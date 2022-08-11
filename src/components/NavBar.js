import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import logo from '../images/logo-black.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar(props) {
  const signOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Disclosure as='nav' className='bg-white-200 shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start '>
                <div className='flex-shrink-0 flex items-center'>
                  <Link to='/'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src={logo}
                      alt='TreesAI Impact Planner logo'
                    />
                    <img
                      className='hidden lg:block h-6 w-auto'
                      src={logo}
                      alt='TreesAI Impact Planner logo'
                    />
                  </Link>
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  <span
                    className={classNames(
                      props.current === 'home'
                        ? 'border-green-600 text-dark-wood-800'
                        : 'border-transparent text-dark-wood-600',
                      'inline-flex items-center px-1 pt-1 border-b-2 medium-intro-sm',
                    )}
                  >
                    <Link to='/'>Home</Link>
                  </span>
                  <span
                    className={classNames(
                      props.current === 'projectSubmit'
                        ? 'border-green-600 text-dark-wood-800'
                        : 'border-transparent text-dark-wood-600',
                      'inline-flex items-center px-1 pt-1 border-b-2 medium-intro-sm',
                    )}
                  >
                    <Link to='/submit-project'>Impact Explorer</Link>
                  </span>
                  <span
                    className={classNames(
                      props.current === 'portfolio'
                        ? 'border-green-600 text-dark-wood-800'
                        : 'border-transparent text-dark-wood-600',
                      'inline-flex items-center px-1 pt-1 border-b-2 medium-intro-sm',
                    )}
                  >
                    <Link to='/portfolio'>Project Atlas</Link>
                  </span>
                  <a
                    href='#'
                    className={classNames(
                      props.current === 'learn'
                        ? 'border-green-600 text-dark-wood-800'
                        : 'border-transparent text-dark-wood-600',
                      'inline-flex items-center px-1 pt-1 border-b-2 medium-intro-sm',
                    )}
                  >
                    Learn more
                  </a>
                  <a
                    href='#'
                    className={classNames(
                      props.current === 'contact'
                        ? 'border-green-600 text-dark-wood-800'
                        : 'border-transparent text-dark-wood-600',
                      'inline-flex items-center px-1 pt-1 border-b-2 medium-intro-sm',
                    )}
                  >
                    Contact
                  </a>
                </div>
              </div>
              {props.loggedIn ? (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button
                    type='button'
                    className='bg-white-200 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <span className='sr-only'>View notifications</span>
                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='bg-white-200 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        <span className='sr-only'>Open user menu</span>
                        <span className='medium-intro-sm'>
                          {sessionStorage.getItem('user_name')}
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 medium-intro-sm text-gray-700',
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 medium-intro-sm text-gray-700',
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={signOut}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 medium-intro-sm text-gray-700',
                              )}
                            >
                              Sign out
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium font-medium rounded-full shadow-sm text-green-600 bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2'
                  >
                    <Link to='/register'>Sign up</Link>
                  </button>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <Link to='/login'>Login</Link>
                  </button>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-4 space-y-1'>
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as='a'
                href='#'
                className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                City Portfolio
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Submit Project
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Learn more
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Contact
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

NavBar.propTypes = {
  current: PropTypes.string,
  loggedIn: PropTypes.bool,
};
