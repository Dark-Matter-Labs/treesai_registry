import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import explorerImage from '../images/explorer-preview.png';

export default function Home(props) {
  return (
    <div className='font-favorit '>
      <div className='relative overflow-hidden'>
        <NavBar loggedIn={props.loggedIn} current='home' />
        <main className=' bg-white-200 pb-20 max-w-screen-2xl mx-auto'>
          <div className='title-box mt-4 bg-indigo-600 py-40'>
            <h2 className='text-center text-white-200'>Welcome to TreesAI</h2>
            <h3 className='pt-8 text-center text-white-200'>
              TreesAI Portfolio helps you manage your Nature-based Solutions assets for the benefit
              of people and the planet
            </h3>
          </div>
          <div className='grid bg-dark-wood-300 py-5'>
            <div className='place-self-center pt-4'>
              <Link to='/measure'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Measure
                </button>
              </Link>
              <Link to='/plan'>
                <button
                  type='button'
                  className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Plan
                </button>
              </Link>
            </div>
          </div>

          <div className='py-20 text-center'>
            <h2 className='pb-4 text-center text-dark-wood-800'>
              Discover our 3 easy steps for Nature-based Solutions:
            </h2>

            <div className='grid grid-cols-3 gap-x-0 text-center'>
              <div>
                <div className='title-text-container plan-background-shape py-24'>
                  <h1 className='text-center text-white-200'>Plan</h1>
                </div>
                <p className='book-info-lg mt-4'>
                  Start now planning and viewing your Portfolio of projects
                </p>
              </div>
              <div>
                <div className='title-text-container measure-background-shape py-24'>
                  <h1 className='text-center text-white-200'>Measure</h1>
                </div>
                <p className='book-info-lg mt-4'>
                  Measure the impact of your projects with single or Multi typologies
                </p>
              </div>
              <div>
                <div className='title-text-container list-background-shape py-20'>
                  <h1 className='text-center text-white-200'>Finance</h1>
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
              <div className='max-w-xl py-10'>
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
