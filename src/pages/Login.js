import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

import { getUserMeInfo, getUserToken } from '../utils/backendCRUD';

import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    const getTokenPayload = {
      username: email,
      password: password,
    };

    // Set LoadingSpinner
    setIsLoading(true);

    // Get user token and info
    getUserToken(getTokenPayload)
      .then(() => {
        getUserMeInfo().then((result) => {
          setIsLoading(false);
          toast.success('Welcome ' + result.name);
          navigate('/develop');
          window.location.reload();
        });
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <NavBar />
      <div className='flex global-margin flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='title-box mt-4 bg-green-600 py-20 text-center'>
          <h1 className='text-white-200'>Login to your account</h1>
        </div>
        <div className='title-box-alter mt-4 bg-white-300'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='py-8 px-4 sm:rounded-lg sm:px-10'>
              <form className='space-y-6'>
                <div>
                  <label htmlFor='email' className='block book-info-md text-gray-700'>
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      defaultValue={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='password' className='block book-info-md text-gray-700'>
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      defaultValue={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={loginUser}
                    type='button'
                    className='flex w-full justify-center rounded-full border border-transparent bg-green-600 py-2 px-4 bold-info-md text-white-200 shadow-sm hover:bg-green-800'
                  >
                    {isLoading && <LoadingSpinner />}
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            padding: '16px',
            borderTopLeftRadius: '130px',
            borderBottomRightRadius: '130px',
          },
        }}
      />
    </>
  );
}
