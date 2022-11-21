import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { get_user_me_info, get_user_token } from '../utils/backendCRUD';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function loginSuccess(res) {
    toast.success('Welcome ' + res.name);
    navigate('/develop');
    window.location.reload();
  }

  const logUser = async (data) => {
    const getTokenPayload = {
      username: data.email,
      password: data.password,
    };

    // Set LoadingSpinner
    setIsLoading(true);

    // Get user token and info
    get_user_token(getTokenPayload).then(() => {
      setIsLoading(false);

      if (sessionStorage.getItem('token')) {
        get_user_me_info().then((result) => {
          loginSuccess(result);
        });
      }
    });
  };

  const onSubmit = (formData) => logUser(formData);

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
              <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor='email' className='block book-info-md text-gray-700'>
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
                    className='flex w-full justify-center rounded-full border border-transparent bg-green-600 py-2 px-4 bold-info-md text-white-200 shadow-sm hover:bg-green-800'
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
