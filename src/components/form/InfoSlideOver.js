import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import infoImage from '../../images/info_eye.svg';

export default function InfoSlideOver() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
        onClick={() => setOpen(true)}
      >
        <span className='sr-only'>Open ToolTip</span>

        <img className='inline-block h-12 w-12' src={infoImage} />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={setOpen}>
          <div className='fixed inset-0' />

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl rounded-tl-[60px]'>
                      <div className='bg-indigo-600 py-6 px-4 sm:px-6'>
                        <div className='flex items-center justify-between'>
                          <Dialog.Title className='text-white-200'>
                            <h3>Panel information</h3>
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                              onClick={() => setOpen(false)}
                            >
                              <span className='sr-only'>Close panel</span>
                              <XIcon className='h-6 w-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative flex-1 py-6 px-4 sm:px-6'>
                        <p className='book-intro-md text-dark-wood-800'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                          Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                          himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
                          pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
                          urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit
                          amet lacinia. Aliquam in elementum tellus.
                        </p>
                        <div className='absolute inset-0 py-6 px-4 sm:px-6'>
                          <div
                            className='h-full border-2 border-dashed border-gray-200'
                            aria-hidden='true'
                          />
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

InfoSlideOver.propTypes = {
  span: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  showInfo: PropTypes.bool,
};