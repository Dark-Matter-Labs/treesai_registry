import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { get_user_token, register_user, get_user_me_info } from '../utils/backendCRUD';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async ({ name, email, password }) => {
    const createUserPayload = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    const getTokenPayload = {
      username: email,
      password: password,
    };

    setIsLoading(true);

    await register_user(createUserPayload).then(() => {
      console.log('User created successfully');

      get_user_token(getTokenPayload).then(() => {
        get_user_me_info().then(() => {
          setIsLoading(false);
          toast.success('Welcome ' + name);
          navigate('/develop');
          window.location.reload();
        });
      });
    });
  };

  const onSubmit = (formData) => registerUser(formData);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Helmet>
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Helmet>
      )}
      <NavBar />
      <div className='flex global-margin flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='title-box mt-4 bg-indigo-600 py-20 text-center'>
          <h1 className='text-white-200'>Register account</h1>
        </div>
        <div className='title-box-alter mt-4 bg-white-300'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <p className='book-info-lg  mt-2 text-center text-gray-900'>
                Already registered? Login{' '}
                <Link className='text-green-600' to='/login'>
                  here
                </Link>
                .
              </p>
            </div>
            <div className='py-8 px-4 sm:rounded-lg sm:px-10'>
              <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor='name' className='block book-info-md text-gray-700'>
                    Name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      placeholder='Name'
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      {...register('name', { required: true, maxLength: 20 })}
                    />
                    {errors.name && (
                      <span className='block book-info-md text-gray-700'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor='email' className='block book-info-md  text-gray-700'>
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      placeholder='email'
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && (
                      <span className='block book-info-md text-gray-700'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor='password' className='block book-info-md text-gray-700'>
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      type='password'
                      placeholder='password'
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      {...register('password', { required: true, maxLength: 100 })}
                    />
                    {errors.password && (
                      <span className='block book-info-md text-gray-700'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type='submit'
                    className='flex w-full justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-4 bold-info-md text-white shadow-sm hover:bg-indigo-800'
                  />
                  {isLoading && <LoadingSpinner />}
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
