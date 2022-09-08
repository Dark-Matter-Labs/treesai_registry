import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    const getTokenRequestHeaders = new Headers();
    getTokenRequestHeaders.append('accept', 'application/json');
    getTokenRequestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const getTokenPayload = {
      username: email,
      password: password,
    };

    let formBody = [];
    for (var property in getTokenPayload) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(getTokenPayload[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const getTokenRequestOptions = {
      method: 'POST',
      headers: getTokenRequestHeaders,
      body: formBody,
      redirect: 'follow',
    };

    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/token', getTokenRequestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        toast.error('Something went wrong');
        setIsLoading(false);
        throw new Error('Something went wrong');
      })
      .then((result) => {
        sessionStorage.setItem('token', result.access_token);

        const getUserRequestHeaders = new Headers();
        getUserRequestHeaders.append('accept', 'application/json');
        getUserRequestHeaders.append('Content-Type', 'application/json');
        getUserRequestHeaders.append('Access-Control-Allow-Origin', '*');
        getUserRequestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

        const getUserRequestOptions = {
          method: 'GET',
          headers: getUserRequestHeaders,
          redirect: 'follow',
        };

        fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/users/me/', getUserRequestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            toast.error('Something went wrong');
            setIsLoading(false);
            throw new Error('Something went wrong');
          })
          .then((result) => {
            sessionStorage.setItem('user_id', JSON.stringify(result.id));
            sessionStorage.setItem('user_name', JSON.stringify(result.name));
            setIsLoading(false);
            toast.success('Welcome ' + result.name);
            navigate('/develop');
            window.location.reload();
          })
          .catch((error) => console.log('error', error));
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <NavBar />
      <div className='flex mx-auto max-w-7xl flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='title-box mt-4 bg-green-600 py-20 text-center'>
          <h1 className='text-white-200'>Login to your account</h1>
        </div>
        <div className='title-box-alter mt-4 bg-white-300'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='py-8 px-4 sm:rounded-lg sm:px-10'>
            <form className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
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
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
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
                  className='flex w-full justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
      <Toaster position='top-right' />
    </>
  );
}
