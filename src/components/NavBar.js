import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/TreesAIRegistry.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar(props) {
  const navigate = useNavigate();

  const signOut = () => {
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <Disclosure as='nav' className='bg-white border sticky top-0 z-50 rounded-full'>
        {({ open }) => (
          <>
            <div className='global-margin px-2 sm:px-6 lg:px-8 border-b-2 border-b-dark-wood-800'>
              <div className='relative flex h-16 justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center pr-20'>
                    <Link to='/'>
                      <img
                        className='block h-8 w-auto lg:hidden'
                        src={logo}
                        alt='TreesAI Registry logo'
                      />
                      <img
                        className='hidden h-6 w-auto lg:block'
                        src={logo}
                        alt='TreesAI Registry logo'
                      />
                    </Link>
                  </div>
                  <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                    <span
                      className={classNames(
                        props.current === 'projectSubmit'
                          ? 'border-green-600 text-dark-wood-800'
                          : 'border-transparent text-gray-500',
                        'medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1',
                      )}
                    >
                      <Link to='/develop'>Develop</Link>
                    </span>
                    <span
                      className={classNames(
                        props.current === 'portfolio'
                          ? 'border-green-600 text-dark-wood-800'
                          : 'border-transparent text-gray-500',
                        'medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1',
                      )}
                    >
                      <Link to='/explore'>Explore</Link>
                    </span>
                    <div
                      className={classNames(
                        props.current === 'invest' ? 'border-green-600 ' : 'border-transparent ',
                        'flex border-b-2 items-center',
                      )}
                    >
                      <Menu as='div' className='relative'>
                        <div>
                          <Menu.Button className='flex rounded-full bg-white-200'>
                            <span className='sr-only'>Open invest menu</span>
                            <span className='medium-intro-sm'>
                              <span
                                className={classNames(
                                  props.current === 'invest'
                                    ? 'text-dark-wood-800'
                                    : 'text-gray-500',
                                  'medium-intro-sm inline-flex items-center px-1 pt-1',
                                )}
                              >
                                Invest
                                <ChevronDownIcon
                                  className={classNames(
                                    props.current === 'invest'
                                      ? 'text-dark-wood-800'
                                      : 'text-gray-500',
                                    'h-4 w-4',
                                  )}
                                  aria-hidden='true'
                                />
                              </span>
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
                          <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to='/invest'>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'medium-intro-sm block px-4 py-2 text-gray-700',
                                    )}
                                  >
                                    Invest
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to='/glasgow-nbs-portfolio'>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'medium-intro-sm block px-4 py-2 text-gray-700',
                                    )}
                                  >
                                    Glasgow Portfolio
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <span
                      className={classNames(
                        props.current === 'demo'
                          ? 'border-green-600 text-dark-wood-800'
                          : 'border-transparent text-gray-500',
                        'medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1',
                      )}
                    >
                      <Link to='/demo'>Demo</Link>
                    </span>
                  </div>
                </div>
                <div
                  className={classNames(
                    props.current === 'learn' ? 'border-green-600 ' : 'border-transparent ',
                    'flex border-b-2 items-center',
                  )}
                >
                  <Menu as='div' className='relative'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-white-200 text-sm'>
                        <span className='sr-only'>Open learn more menu</span>
                        <span className='medium-intro-sm'>
                          <span
                            className={classNames(
                              props.current === 'learn' ? 'text-dark-wood-800' : 'text-gray-500',
                              'medium-intro-sm inline-flex items-center px-1 pt-1',
                            )}
                          >
                            Learn More
                            <ChevronDownIcon
                              className={classNames(
                                props.current === 'learn'
                                  ? 'text-dark-wood-800'
                                  : 'text-dark-wood-600',
                                'h-4 w-4',
                              )}
                              aria-hidden='true'
                            />
                          </span>
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
                      <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to='/learn-more'>
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'medium-intro-sm block px-4 py-2 text-gray-700',
                                )}
                              >
                                Learn more
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to='/contact'>
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'medium-intro-sm block px-4 py-2 text-gray-700',
                                )}
                              >
                                Contact
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                {props.loggedIn ? (
                  <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='bold-intro-sm inline-flex justify-center rounded-full py-2 px-2 mx-2 shadow-sm bg-indigo-600 text-white-200 hover:bg-indigo-700'>
                          <span className='sr-only'>Open user menu</span>
                          <span className='medium-intro-sm '>
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
                        <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <>
                                <Link to='/account'>
                                  <span
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'medium-intro-sm block px-4 py-2 text-gray-700',
                                    )}
                                  >
                                    Account
                                  </span>
                                </Link>
                                <span
                                  onClick={signOut}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'medium-intro-sm block px-4 py-2 text-gray-700',
                                  )}
                                >
                                  Sign out
                                </span>
                              </>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className='flex items-center '>
                    <button
                      type='button'
                      className='medium-intro-sm inline-flex justify-center rounded-full py-2 px-2 mx-2 shadow-sm bg-gray-800 text-white hover:bg-indigo-700'
                    >
                      <Link to='/register'>Sign up</Link>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 pt-2 pb-4'>
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as='a'
                  href='/develop'
                  className='block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700'
                >
                  Develop
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/explore'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Explore
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/invest'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Invest
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/glasgow-nbs-portfolio'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Glasgow Pilot
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/demo'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Demo
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/learn-more'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Learn More
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/contact'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Contact
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/register'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Sign up
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/login'
                  className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                >
                  Login
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

NavBar.propTypes = {
  current: PropTypes.string,
  loggedIn: PropTypes.bool,
};
