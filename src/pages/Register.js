import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    const createUserRequestHeaders = new Headers();
    createUserRequestHeaders.append('accept', 'application/json');
    createUserRequestHeaders.append('Content-Type', 'application/json');
    createUserRequestHeaders.append('Access-Control-Allow-Origin', '*');

    const createUserPayload = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    const createUserRequestOptions = {
      method: 'POST',
      headers: createUserRequestHeaders,
      body: createUserPayload,
    };

    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/users', createUserRequestOptions)
      .then((response) => {
        if (response.ok) {
          sessionStorage.setItem('user_name', name);
          return response.json();
        }
        toast.error('Something went wrong');
        setIsLoading(false);
        throw new Error('Something went wrong');
      })
      .then((result) => {
        sessionStorage.setItem('user_id', JSON.stringify(result.id));

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

        fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/token', getTokenRequestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            setIsLoading(false);
            throw new Error('Something went wrong');
          })
          .then((result) => {
            console.log(result);
            sessionStorage.setItem('token', JSON.stringify(result.access_token));
            setIsLoading(false);
            toast.success('Successfully registered!');
            navigate('/develop');
            window.location.reload();
          })
          .catch((error) => {
            console.log('error', error);
            toast.error('Something went wrong');
          });
      })
      .catch((error) => {
        console.log('error getting token', error);
      });
  };

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
              <form className='space-y-6'>
                <div>
                  <label htmlFor='name' className='block book-info-md text-gray-700'>
                    Name
                  </label>
                  <div className='mt-1'>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      defaultValue={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                      className='block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='email' className='block book-info-md  text-gray-700'>
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
                    onClick={registerUser}
                    type='button'
                    className='flex w-full justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-4 bold-info-md text-white shadow-sm hover:bg-indigo-800'
                  >
                    {isLoading && <LoadingSpinner />}
                    Register
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
