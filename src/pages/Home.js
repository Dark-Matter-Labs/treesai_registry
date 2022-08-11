import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import explorerImage from '../images/explorer-preview.png';

export default function Home(props) {
  return (
    <div className='font-favorit'>
      <div className='relative overflow-hidden'>
        <NavBar loggedIn={props.loggedIn} current='home' />
        <main className='bg-white-200 mx-10 pb-20'>
          <div className='title-box py-40 mt-4 bg-indigo-600'>
            <h2 className='text-white-200 text-center'>Welcome to TreesAI</h2>
            <h3 className='pt-8 text-white-200 text-center'>
              TreesAI Portfolio helps you manage your Nature-based Solutions assets for the benefit
              of people and the planet
            </h3>
          </div>
          <div className='bg-dark-wood-300 grid py-5'>
            <div className='place-self-center pt-4'>
              <Link to='/submit-project'>
                <button
                  type='button'
                  className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Impact Explorer
                </button>
              </Link>
              <Link to='/portfolio'>
                <button
                  type='button'
                  className='ml-10 bg-indigo-600 py-2 px-8 border border-gray-300 rounded-full shadow-sm bold-intro-sm text-white-200 hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Project Atlas
                </button>
              </Link>
            </div>
          </div>

          <div className='text-center py-20'>
            <h2 className='text-dark-wood-800 text-center pb-4'>
              Discover our 3 easy steps for Nature-based Solutions:
            </h2>

            <div className='grid grid-cols-3 gap-x-0 text-center'>
              <div>
                <div className='title-text-container plan-background-shape py-20'>
                  <h1 className='text-center text-white-200'>Plan</h1>
                </div>
                <p className='book-info-lg mt-4'>
                  Start now planning and viewing your Portfolio of projects
                </p>
              </div>
              <div>
                <div className='title-text-container measure-background-shape py-20'>
                  <h1 className='text-center text-white-200'>Measure</h1>
                </div>
                <p className='book-info-lg mt-4'>
                  Measure the impact of your projects with single or Multi typologies
                </p>
              </div>
              <div>
                <div className='title-text-container list-background-shape py-20'>
                  <h1 className='text-center text-white-200'>List</h1>
                </div>
                <p className='book-info-lg mt-4'>
                  Upload you project and add your project to TreesAI Portfolio
                </p>
              </div>
            </div>
          </div>

          <div className='title-box bg-green-300'>
            <div className='grid grid-cols-2'>
              <div className=''>
                <h3 className='pt-20 pl-8'>Discover and try our Impact Planner</h3>
              </div>
              <div className='py-10 max-w-xl'>
                <img src={explorerImage} alt='explorer preview image' />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Home.propTypes = {
  loggedIn: PropTypes.bool,
};
