import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import GCCLogo from '../images/partner_logos/GCC.png';
import CCFLogo from '../images/partner_logos/CCF.png';
import TerraLogo from '../images/partner_logos/terra.png';
import MGSDPLogo from '../images/partner_logos/MGSDP.png';
import fullLogo from '../images/registry-logo.svg';
import pdIcon from '../images/PDIcon.png';
import devIcon from '../images/DevelopIcon.png';
import recIcon from '../images/ReceiveIcon.png';
import implementIcon from '../images/ImplementIcon.png';
import impactScreen from '../images/ImpactScreen.png';
import mapScreen from '../images/MapScreen.png';
import curiousIcon from '../images/CuriousIcon.png';

export default function Home(props) {
  return (
    <div className='bg-white-300'>
      <NavBar loggedIn={props.loggedIn} current='home' />
      <div className=''>
        <main className='bg-white-300 pb-20 global-margin'>
          <div className='bg-header py-10 md:py-20 flex flex-col items-center justify-center rounded-tl-[160px] my-10'>
            <div className='max-w-2xl text-center'>
              <div className=''>
                <img className='hidden lg:block' src={fullLogo} alt='TreesAI logo' />
              </div>
              <div>
                <h2 className='text-white-200'>Revaluing nature as urban infrastructure</h2>
              </div>
            </div>
          </div>

          <div className='py-10'>
            <div className='max-w-2xl m-auto text-center'>
              <h2 className='pb-8 text-dark-wood-800'>
                TreesAI Registry is the home for financing urban Nature-based Solutions.
              </h2>
              <p className='pb-10 book-intro-lg text-dark-wood-800'>
                Hosting the impact assessment and investment tools to match project developers with
                green urban investors.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-0 my-10 mx-auto w-11/12'>
              <div className='bg-green-400 rounded-l-[60px]'>
                <div className='flex items-center justify-center py-16 '>
                  <img
                    className='object-contain h-[300px] aspect-square'
                    src={pdIcon}
                    alt='project developer icon'
                  ></img>
                </div>
              </div>
              <div className='bg-pd py-4 xl:py-14 pl-40 m-over '>
                <div className=''>
                  <div className=' max-w-lg'>
                    <h1 className='text-white-200'>Project developers</h1>
                    <hr className='my-4 mr-20' />
                    <h3 className=' text-white-200 pt-10'>
                      Providing project developers with the features & services needed to coordinate
                      Nature-based Solutions (NbS) into investable portfolios.
                    </h3>
                    <div className='flex items-center justify-center'>
                      <Link to='/explore'>
                        <button
                          type='button'
                          className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 mt-14 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                        >
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pb-10'>
            <div className='max-w-2xl m-auto text-center'>
              <h2 className='pb-8 text-dark-wood-800'>Key Features</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-green-600 pt-14 px-16 justify-items-center place-items-baseline'>
              <div>
                <img className='h-48 object-contain aspect-square' src={devIcon} />
                <hr width='1' className='h-32 mx-auto  border border-green-600' />
              </div>
              <div className='col-span-2'>
                <h2 className='text-dark-wood-800'>DEVELOP</h2>
                <p className='text-dark-wood-800 book-intro-sm max-w-xl pt-10'>
                  Whether you’re a community group, NGO, municipality or local landowner – use our
                  locational scoring methodology and impact modelling to develop an investable
                  project that drives resilience in your city.{' '}
                </p>
              </div>
              <div>
                <Link to='/develop'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                  >
                    Develop
                  </button>
                </Link>
                <p className='text-dark-wood-800 book-intro-sm pt-10'>KEY ACTIONS</p>
                <ul className='text-dark-wood-800 bold-intro-sm list-disc pt-5'>
                  <li>Upload your project data</li>
                  <li>Calculate your project impacts</li>
                  <li>Submit your project for investment</li>
                </ul>
              </div>
            </div>
            <hr className='mx-40 border-8 border-green-600' />

            <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-green-600 px-16 justify-items-center place-items-baseline'>
              <div>
                <hr width='1' className='h-20 mx-auto border border-green-600' />
                <img className='h-48 object-contain aspect-square' src={recIcon} />
                <hr width='1' className='h-32 mx-auto  border border-green-600' />
              </div>
              <div className='col-span-2 pt-14'>
                <h2 className='text-dark-wood-600'>
                  RECEIVE <span className='text-dark-wood-600 bold-intro-sm'>(coming soon)</span>
                </h2>

                <p className='text-dark-wood-600 book-intro-sm max-w-xl pt-10'>
                  Upload your project on TreesAI Registry. You will be notified when the project has
                  been selected into a portfolio and once the portfolio has been fully funded.
                </p>
                <p className='text-dark-wood-600 book-intro-sm max-w-xl pt-10'>
                  You will then be contracted and receive funds to deliver your project.
                </p>
              </div>
              <div>
                <button
                  type='button'
                  className='disabled mt-14 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-600 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Contract
                </button>
                <p className='text-dark-wood-600 book-intro-sm pt-10'>KEY ACTIONS</p>
                <ul className='text-dark-wood-600 bold-intro-sm list-disc pt-5'>
                  <li>Project selected into a portfolio</li>
                  <li>Portfolio receives 100% funding</li>
                  <li>Sign contract to deliver project</li>
                </ul>
              </div>
            </div>
            <hr className='mx-40 border-8 border-green-600' />

            <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-green-600 pb-20 px-16 justify-items-center place-items-baseline'>
              <div>
                <hr width='1' className='h-20 mx-auto border border-green-600' />
                <img className='h-48 object-contain aspect-square' src={implementIcon} />
              </div>
              <div className='col-span-2 pt-14'>
                <h2 className='text-dark-wood-600'>
                  IMPLEMENT & MAINTAIN{' '}
                  <span className='text-dark-wood-600 bold-intro-sm'>(coming soon)</span>
                </h2>
                <p className='text-dark-wood-600 book-intro-sm max-w-xl pt-10'>
                  Use the funds to construct your project, which will be monitored, verified and
                  reported by our 3rd party accredited partners.
                </p>
                <p className='text-dark-wood-600 book-intro-sm max-w-xl pt-10'>
                  As your project is verified, receive payments for maintenance activities.
                </p>
              </div>
              <div>
                <button
                  type='button'
                  className='disabled mt-14 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-600 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Report
                </button>
                <p className='text-dark-wood-600 book-intro-sm pt-10'>KEY ACTIONS</p>
                <ul className='text-dark-wood-600 bold-intro-sm list-disc pt-5'>
                  <li>Receive funds and construct project</li>
                  <li>Monitor, verify and report on impacts</li>
                  <li>Receive funds to maintain project </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='my-10 grid grid-cols-1 lg:grid-cols-3 gap-x-0'>
            <div className='max-w-lg px-20 py-20'>
              <h3 className='text-dark-wood-800'>
                A platform registry to evaluate the impact of your projects.
              </h3>
              <p className='text-dark-wood-800 book-intro-sm pt-5'>
                Through our registry, you can access our Develop tool. By filling in a form with
                your project data you’ll be able to quickly estimate the impacts of your project.
              </p>
              <Link to='/develop'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Develop
                </button>
              </Link>
            </div>
            <div className='mx-auto max-w-2xl col-span-2'>
              <img src={impactScreen} alt='Impact screenshot' />
            </div>
          </div>

          <div className='my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-0'>
            <div className='max-w-2xl'>
              <img src={mapScreen} alt='Map screenshot' />
            </div>
            <div className='max-w-lg px-10 py-20'>
              <h3 className='text-dark-wood-800'>View projects on the map</h3>
              <p className='text-dark-wood-800 book-intro-sm pt-5'>
                Through the Registry, you can use the Explore tool to view your projects in the
                context of different map data sets (from canopy cover to social deprivation) as well
                as other Nature-based Solutions projects.
              </p>
              <Link to='/explore'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>

          <div className='my-10'>
            <div className='max-w-2xl m-auto text-center'>
              <h2 className='pb-8 text-dark-wood-800'>Get started!</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 justify-items-center  '>
              <div className=''>
                <Link to='/demo'>
                  <div className='title-text-container plan-background-shape py-28 px-28'>
                    <h3 className='text-center text-white-200'>Quick Demo!</h3>
                  </div>
                </Link>
              </div>

              <div className=''>
                <Link to='/develop'>
                  <div className='title-text-container measure-background-shape py-28 px-28'>
                    <h3 className='text-center text-white-200'>Upload a project</h3>
                  </div>
                </Link>
              </div>

              <div className=''>
                <Link to='/explore'>
                  <div className='title-text-container list-background-shape py-28 px-28'>
                    <h3 className='text-center text-white-200'>Explore the NbS map</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className='rounded-[60px] bg-white-200 my-10 py-10 px-10 border border-green-600'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-28'>
              <div className='pl-5'>
                <h3 className='text-dark-wood-800'>Trusted by Project Developers</h3>
                <p className='book-intro-sm pt-4 text-dark-wood-800'>
                  TreesAI is working with project developers, local authorities and environmental
                  institutions to help them meet their climate and biodiversity targets, while
                  achieving social and economic objectives.
                </p>
              </div>
              <div className='col-span-2'>
                <div className='mt-8 flow-root self-center lg:mt-0'>
                  <div className='-mt-4 -ml-4 flex flex-wrap justify-around lg:-ml-4'>
                    <div className='mt-4 lex flex-shrink-0 flex-grow justify-center  lg:flex-grow-0 border border-black rounded-full'>
                      <img className='h-40' src={GCCLogo} alt='Glasgow City Council Logo' />
                    </div>
                    <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0 border border-black rounded-full'>
                      <img className='h-40' src={CCFLogo} alt='Tuple' />
                    </div>
                    <div className='mt-4  flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0 border border-black rounded-full'>
                      <img className='h-40' src={TerraLogo} alt='Level' />
                    </div>
                    <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0 border border-black rounded-full'>
                      <img className='h-40' src={MGSDPLogo} alt='Level' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-curious px-20 py-10 mx-auto max-w-6xl my-20  grid grid-cols-4 justify-items-center content-center place-content-center place-items-center'>
            <div>
              <img className='h-[166px] object-scale-down aspect-square' src={curiousIcon} alt='curious investor icon' />
            </div>
            <div className='col-span-2'>
              <h3 className='text-white-200'>Curious about how TreesAI works with investors?</h3>
            </div>
            <div>
              <Link to='/invest'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Investors
                </button>
              </Link>
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
