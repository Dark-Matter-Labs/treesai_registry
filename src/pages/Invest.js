import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import waterImg from '../images/water.png';
import lenderImg from '../images/lenders.png';
import insuranceImg from '../images/insure.png';
import assetImg from '../images/asset.png';
import findIcon from '../images/find.png';
import investIcon from '../images/invest.png';
import receiveIcon from '../images/receive.png';
import mapScreen from '../images/MapScreen.png';
import glasgowImg from '../images/glasgow.jpg';
import GCCLogo from '../images/partner_logos/GCC.png';
import FloodLogo from '../images/partner_logos/FloodRe.png';
import SWLogo from '../images/partner_logos/ScottWater.png';
import TerraLogo from '../images/partner_logos/terra.png';

import curiousIcon from '../images/curious2.png';

export default function Invest({ loggedIn }) {
  return (
    <div className='bg-white-300 '>
      <NavBar loggedIn={loggedIn} current='invest' />
      <div className='global-margin '>
        <div className='bg-investor mt-4 grid grid-cols-1 lg:grid-cols-2 py-40 justify-items-center content-center place-content-center place-items-center gap-x-0'>
          <div className='bg-white-200 rounded-br-[100px] px-4 lg:py-10 max-w-sm '>
            <h1 className='text-center text-indigo-600'>Green Urban Investors</h1>
          </div>
          <div className='max-w-sm'>
            <h3 className='text-indigo-600 lg:text-white-200'>
              Providing green investors with the tools to invest in urban nature to reduce
              climate-related risks.
            </h3>
          </div>
        </div>

        <div className='py-10'>
          <div className='max-w-2xl m-auto text-center'>
            <h2 className='pb-8 text-dark-wood-800'>
              How could you benefit from investing in urban Nature-based Solutions?
            </h2>
            <p className='pb-10 book-intro-lg text-dark-wood-600'>
              Nature provides many benefits helping to mitigate climate risks.
            </p>
          </div>
        </div>

        <div className='my-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-0 text-center'>
            <div className='flex flex-col items-center justify-center'>
              <img className='pb-2' src={waterImg} alt='' />
              <h3 className='text-dark-wood-800 py-8'>Water Utilities</h3>
              <p className='book-intro-lg text-dark-wood-800 max-w-xs'>
                Mitigate against potential sewer spills
              </p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img className='pb-2' src={lenderImg} alt='' />
              <h3 className='text-dark-wood-800 py-8'>Lenders</h3>
              <p className='book-intro-lg text-dark-wood-800 max-w-xs'>
                Mitigate against mortgage debt impairment
              </p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img className='pb-2' src={insuranceImg} alt='' />
              <h3 className='text-dark-wood-800 py-8'>(Re)insurers</h3>
              <p className='book-intro-lg text-dark-wood-800 max-w-xs'>
                Mitigate against insurance payouts
              </p>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <img className='pb-2' src={assetImg} alt='' />
              <h3 className='text-dark-wood-800 py-8'>Asset Owners</h3>
              <p className='book-intro-lg text-dark-wood-800 max-w-xs'>
                Mitigate against property damage
              </p>
            </div>
          </div>
        </div>

        <div className='py-10'>
          <div className='max-w-2xl m-auto text-center'>
            <h2 className='pb-8 text-dark-wood-800'>How does it work?</h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-indigo-600 pt-14 px-16 justify-items-center place-items-baseline'>
            <div>
              <img className='h-48' src={findIcon} />
              <hr width='1' className='h-24 mx-auto  border border-indigo-600' />
            </div>
            <div className='col-span-2'>
              <h2 className='text-dark-wood-800'>FIND</h2>
              <p className='text-dark-wood-800 book-intro-sm max-w-xl pt-10'>
                Whether you’re a financial institution, a large corporation, an SME or a public
                entity – if you hold climate-related risks – use our <b>Explore</b> tool to find
                vetted high-quality projects in your region tailored to your climate-related
                demands.
              </p>
            </div>
            <div className='py-20'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Explore
                </button>
            </div>
          </div>
          <hr className='mx-40 border-8 border-indigo-600' />

          <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-indigo-600 px-16 justify-items-center place-items-baseline'>
            <div>
              <hr width='1' className='h-20 mx-auto border border-indigo-600' />
              <img className='h-48' src={investIcon} />
              <hr width='1' className='h-32 mx-auto  border border-indigo-600' />
            </div>
            <div className='col-span-2 pt-14'>
              <h2 className='text-dark-wood-800'>INVEST</h2>

              <p className='text-dark-wood-800 book-intro-sm max-w-xl pt-10'>
                We are currently developing a marketplace for seamless transactions - in the
                meantime, register your interest and our origination team will reach out to help you
                find the investment solutions best tailored to your needs.
              </p>
            </div>
            <div className='py-20'>
              <Link to='/contact'>
                <button
                  type='button'
                  className='mt-14 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Get in touch
                </button>
              </Link>
            </div>
          </div>
          <hr className='mx-40 border-8 border-indigo-600' />

          <div className='grid grid-cols-1 sm:grid-cols-4 bg-white-200 rounded-[140px] border border-indigo-600 pb-20 px-16 justify-items-center place-items-baseline'>
            <div>
              <hr width='1' className='h-20 mx-auto border border-indigo-600' />
              <img className='h-48' src={receiveIcon} />
            </div>
            <div className='col-span-2 pt-14'>
              <h2 className='text-dark-wood-800'>RECEIVE</h2>
              <p className='text-dark-wood-800 book-intro-sm max-w-xl pt-10'>
                Receive verified nature-positive tokens in return for your investment.
              </p>
              <p className='text-dark-wood-800 book-intro-sm max-w-xl pt-10'>
                Keep track of the risk-mitigation outcomes associated with your investment by
                logging back into your account and getting customised reporting.
              </p>
            </div>
            <div className='py-20'>
              <button
                type='button'
                className='mt-14 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-600 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
        <div className='my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8'>
          <div className='max-w-4xl'>
            <img src={mapScreen} alt='Map screenshot' />
          </div>
          <div className='max-w-lg px-10 py-20'>
            <h3 className='text-dark-wood-800'>View projects on the map</h3>
            <p className='text-dark-wood-800 book-intro-sm pt-5'>
              Through the Registry, you can use the Explore tool to view projects and portfolios in
              the context of different map data sets (from canopy cover to social deprivation) and
              explore investment opportunities.
            </p>
              <button
                type='button'
                className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                Explore
              </button>
          </div>
        </div>

        <div className='my-20'>
          <div className='rounded-[60px] mt-4 bg-dark-wood-800 py-20 px-20 mt-10'>
            <div className='grid grid-cols-1 sm:grid-cols-3'>
              <div className='max-w-sm'>
                <h2 className='text-white-200 pt-4'>
                  Pilot Study: TreesAI is partnering with Glasgow to drive investments in
                  Nature-based Solutions.
                </h2>
                <p className='text-white-200 medium-intro-lg pt-5'>
                  Public agencies, corporates and financial institutions are launching a pilot to
                  co-finance the delivery of projects that reduce Glasgow’s flood risks.
                </p>
                <Link to='/glasgow-nbs-portfolio'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-white-200 my-10 py-2 px-8 text-dark-wood-800 shadow-sm hover:bg-dark-wood-700 '
                  >
                    Learn More
                  </button>
                </Link>
              </div>
              <div className='col-span-2'>
                <img className='rounded-r-[60px]' src={glasgowImg} alt='Glasgow city' />
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-[60px] bg-indigo-500 my-10 py-10 px-10 border border-green-600'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-28'>
            <div className='pl-5'>
              <h3 className='text-dark-wood-800'>Exploring collective investment models</h3>
              <p className='book-intro-sm pt-4 text-dark-wood-800'>
                TreesAI is working with public and private organisations to better understand the
                requirements for collectively investing in nature.
              </p>
            </div>
            <div className='col-span-2'>
              <div className='mt-8 flow-root self-center lg:mt-0'>
                <div className='-mt-4 -ml-4 flex flex-wrap justify-around lg:-ml-4'>
                  <div className='mt-4 lex flex-shrink-0 flex-grow justify-center  lg:flex-grow-0'>
                    <img className='h-40' src={GCCLogo} alt='Glasgow City Council Logo' />
                  </div>
                  <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                    <img className='h-40' src={SWLogo} alt='Tuple' />
                  </div>
                  <div className='mt-4  flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                    <img className='h-40' src={TerraLogo} alt='Level' />
                  </div>
                  <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                    <img className='h-40' src={FloodLogo} alt='Level' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-curious-registry px-20 py-10 mx-auto max-w-6xl my-20  grid grid-cols-4 justify-items-center content-center place-content-center place-items-center'>
          <div>
            <img src={curiousIcon} alt='curious investor icon' />
          </div>
          <div className='col-span-2'>
            <h3 className='text-white-200'>
              Curious about how TreesAI works with project developers?
            </h3>
          </div>
          <div>
            <button
              type='button'
              className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
            >
              Registry
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Invest.propTypes = {
  loggedIn: PropTypes.bool,
};
