import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import tempImage from '../images/tempImage.png';

export default function Home(props) {
  return (
    <div className='font-favorit '>
      <div className='relative overflow-hidden'>
        <div className='bg-indigo-600'>
          <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
            <div className='flex flex-wrap items-center justify-between'>
              <div className='flex w-0 flex-1 items-center'>
                <p className='ml-3 truncate font-medium text-white'>
                  <span className='md:hidden book-info-md'>We are in beta stage</span>
                  <span className='hidden md:inline book-info-md'>We are in beta stage!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <NavBar loggedIn={props.loggedIn} current='home' />

        <main className=' bg-white-200 pb-20 max-w-screen-2xl mx-auto'>
          <div className='title-box mt-4 bg-indigo-600 py-20'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 ml-20 mt-10'>
                <h1 className='text-white-200'>TreesAI</h1>
                <h2 className='pt-8 text-white-200'>
                  <i>Revaluing nature as urban infrastructure. </i>
                </h2>
              </div>
              <div>
                <img src={tempImage} alt='explorer preview image' />
              </div>
            </div>
          </div>

          <div className='title-box-alter mt-4 bg-green-600 py-20 px-20'>
            <div className='text-center'>
              <h2 className='text-white-200'>
                TreesAI provides project developers and green investors with the impact assessment
                and investment tools to coordinate nature-based solutions within sustainable
                portfolios.
              </h2>
            </div>
          </div>

          <div className='py-20 text-center'>
            <h2 className='pb-4 text-center text-dark-wood-800'>
              TreesAI’s development and investment services
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 text-center'>
              <div>
                <div className='title-text-container plan-background-shape py-16'>
                  <h1 className='text-center text-white-200'>Explore</h1>
                  <h2 className='text-center text-white-200'>NbS Map</h2>
                </div>
                <p className='book-info-lg mt-14 ml-10 text-left max-w-sm'>
                  Discover existing NbS projects and portfolios driving environmental, social and
                  economic impact.
                </p>
                <Link to='/explore'>
                  <button
                    type='button'
                    className='mt-8 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 '
                  >
                    NbS Map →
                  </button>
                </Link>
              </div>
              <div>
                <div className='title-text-container measure-background-shape py-20'>
                  <h1 className='text-center text-white-200'>Develop</h1>
                  <h2 className='text-center text-white-200'>an NbS project</h2>
                </div>
                <p className='book-info-lg mt-4 ml-10 text-left max-w-sm'>
                  Use the NbS Impact Planner to design and register a project, forecast costs, model
                  impacts and measure benefits.
                </p>
                <Link to='/develop'>
                  <button
                    type='button'
                    className='mt-4 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 '
                  >
                    Try it out →
                  </button>
                </Link>
              </div>
              <div>
                <div className='title-text-container list-background-shape py-14'>
                  <h1 className='text-center text-white-200'>Invest</h1>
                  <h2 className='text-center text-white-200'>in a portfolio</h2>
                </div>
                <p className='book-info-lg mt-14 ml-10 text-left max-w-sm'>
                  Invest in a strategic portfolio of NbS that delivers benefit for people and
                  planet.
                </p>
                <Link to='/'>
                  <button
                    type='button'
                    className='mt-8 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 '
                  >
                    Portfolio Manager →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className='title-box bg-indigo-300 py-10'>
            <div className=''>
              <h3 className='text-center'>Testimonials</h3>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-16 py-10 book-intro-sm'>
                <p>
                  “So many of the challenges surrounding the climate emergency will be addressed by
                  our cities and Nature-based Solutions are absolutely critical within that. Urban
                  forests deliver significant ecological, environmental and social gains, creating
                  safer, more resilient and more liveable places.”
                </p>
                <p className='pt-5'>Susan Aitken, CEO of Glasgow City Council</p>
              </div>
              <div className='px-16 py-10 book-intro-sm'>
                <p>
                  “Among the many applications for our Google.org Impact Challenge on Climate, Dark
                  Matter Labs stood out. With their ambitious open-source Trees as Infrastructure
                  initiative, they aim to address the critical problem of facilitating and financing
                  urban tree restoration at scale, helping to address the gap between urban
                  tree-planting targets, their sustainable delivery and long-term maintenance of
                  urban forests.”
                </p>
                <p className='pt-5'>Google.org, Impact Challenge on Climate</p>
              </div>
            </div>
          </div>

          <div className='title-box-alter bg-indigo-300 my-10 py-10'>
            <div className='grid grid-cols-3'>
              <div className='pl-5'>
                <h3 className=''>Trusted by Project Developers</h3>
                <p className='book-intro-sm pt-4'>
                  TreesAI is collaborating with project developers, local authorities and
                  environmental institutions globally to help them meet their climate & biodiversity
                  targets, whilst saving them money on maintenance, and a whole lot more.
                </p>
              </div>
              <div className='col-span-2'>
                <div className='mt-8 flow-root self-center lg:mt-0'>
                  <div className='-mt-4 -ml-8 flex flex-wrap justify-around lg:-ml-4'>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img
                        className='h-12'
                        src='https://tailwindui.com/img/logos/workcation-logo-indigo-900.svg'
                        alt='Workcation'
                      />
                    </div>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img
                        className='h-12'
                        src='https://tailwindui.com/img/logos/tuple-logo-indigo-900.svg'
                        alt='Tuple'
                      />
                    </div>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img
                        className='h-12'
                        src='https://tailwindui.com/img/logos/level-logo-indigo-900.svg'
                        alt='Level'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='py-10 text-center'>
            <h2 className='pb-4  text-dark-wood-800'>Check Glasgow Pilot</h2>
            <Link to='/'>
              <button
                type='button'
                className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 '
              >
                Glasgow pilot
              </button>
            </Link>
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
