import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import logo from '../images/logo-black.svg';

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
            navigate('/submit-project');
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
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img className='mx-auto h-12 w-auto' src={logo} alt='TreesAI logo' />
          <h2 className='mt-6 text-center text-gray-900'>Register</h2>
          <p className='text-center mt-2 font-small text-gray-900'>
            Already registered? Login{' '}
            <Link className='text-green-600' to='/login'>
              here
            </Link>
            .
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
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
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

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
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={registerUser}
                  type='button'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {isLoading && <LoadingSpinner />}
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster position='top-right' />
    </>
  );
}
