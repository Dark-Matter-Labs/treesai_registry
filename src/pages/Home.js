import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import logo from '../images/logo-white.svg';
import MapVideo from '../images/NbSMap.webm';
import GCCLogo from '../images/partner_logos/GCC.png';
import CCFLogo from '../images/partner_logos/CCF.png';
import TerraLogo from '../images/partner_logos/terra.png';
import MGSDPLogo from '../images/partner_logos/MGSDP.png';
import blackdot from '../images/blackdot.png';

export default function Home(props) {
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar loggedIn={props.loggedIn} current='home' />
      <div className=''>
        <main className='bg-white-200 pb-20 global-margin bg-pattern '>
          <div className='title-box mt-4 bg-indigo-600 my-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-0'>
              <div className='ml-28 mt-10'>
                <img src={logo} width='274px' alt='TreesAI logo' />
                <h1 className='pt-20 max-w-md text-white-200'>
                  Revaluing nature as urban infrastructure.
                </h1>
              </div>
              <div className=''>
              <video className='' autoPlay loop muted>
              <source src={MapVideo} type='video/webm'/>
              </video>
              </div>
            </div>
          </div>

          <div className='title-box-alter mt-4 bg-green-600 py-20 px-20'>
            <div className=''>
              <h2 className='text-white-200 text-left'>
                TreesAI provides project developers and green investors with the impact assessment
                and investment tools to coordinate Nature-based Solutions (NbS) within sustainable
                portfolios.
              </h2>
            </div>
          </div>

          <div className='py-20 text-center'>
            <h2 className='pb-4 text-center text-dark-wood-800 pb-20'>
              TreesAI’s development and investment services
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 justify-items-center  '>
              <div className='mt-2'>
                <div className='title-text-container plan-background-shape py-16'>
                  <h1 className='text-center text-white-200'>Explore</h1>
                  <h2 className='text-center text-white-200'>NbS Map</h2>
                </div>
                <div className=''>
                  <p className='book-intro-md mt-10 ml-10 text-left max-w-sm px-10 text-dark-wood-800'>
                    Discover existing NbS projects and portfolios driving environmental, social and
                    economic impact.
                  </p>
                  <Link to='/explore'>
                    <button
                      type='button'
                      className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                    >
                      NbS Map →
                    </button>
                  </Link>
                </div>
              </div>
              <div className=''>
                <div className='title-text-container measure-background-shape py-20'>
                  <h1 className='text-center text-white-200'>Develop</h1>
                  <h2 className='text-center text-white-200'>an NbS project</h2>
                </div>
                <p className='book-intro-md mt-4 ml-10 text-left max-w-sm px-10 text-dark-wood-800'>
                  Use the NbS Impact Planner to design and register a project, forecast costs, model
                  impacts and measure benefits.
                </p>
                <Link to='/demo'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-green-600 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-green-800 '
                  >
                    Try it out →
                  </button>
                </Link>
              </div>
              <div className='mt-10'>
                <div className='title-text-container list-background-shape py-12'>
                  <h1 className='text-center text-white-200'>Invest</h1>
                  <h2 className='text-center text-white-200'>in a portfolio</h2>
                </div>
                <p className='book-intro-md mt-10 ml-10 text-left max-w-sm px-10 text-dark-wood-800'>
                  Invest in a strategic portfolio of NbS that delivers benefit for people and
                  planet.
                </p>
                <Link to='/invest'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 my-16 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800 '
                  >
                    Portfolio Manager →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className='pb-4'>
            <h2 className='text-center '>Testimonials</h2>
          </div>
          <div className='title-box bg-indigo-300 py-10 px-28'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-20'>
              <div className='px-16 py-10 book-intro-sm'>
                <p>
                  “So many of the challenges surrounding the climate emergency will be addressed by
                  our cities and Nature-based Solutions are absolutely critical within that. Urban
                  forests deliver significant ecological, environmental and social gains, creating
                  safer, more resilient and more liveable places.”
                </p>
                <div className='flex items-center pt-10'>
                  <img src={blackdot} />
                  <p className='pl-5 bold-intro-sm'>
                    Susan Aitken
                    <br /> CEO of Glasgow City Council
                  </p>
                </div>
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
                <div className='flex items-center pt-5'>
                  <img src={blackdot} />
                  <p className='bold-intro-sm pl-5'>
                    Google.org
                    <br /> Impact Challenge on Climate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='title-box-alter bg-green-400 my-10 py-10 px-10'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-28'>
              <div className='pl-5'>
                <h2 className=''>Trusted by Project Developers</h2>
                <p className='book-intro-sm pt-4'>
                  TreesAI is collaborating with project developers, local authorities and
                  environmental institutions globally to help them meet their climate & biodiversity
                  targets, whilst saving them money on maintenance, and a whole lot more.
                </p>
              </div>
              <div className='col-span-2'>
                <div className='mt-8 flow-root self-center lg:mt-0'>
                  <div className='-mt-4 -ml-4 flex flex-wrap justify-around lg:-ml-4'>
                    <div className='mt-4 lex flex-shrink-0 flex-grow justify-center  lg:flex-grow-0'>
                      <img className='h-40' src={GCCLogo} alt='Glasgow City Council Logo' />
                    </div>
                    <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                      <img className='h-40' src={CCFLogo} alt='Tuple' />
                    </div>
                    <div className='mt-4  flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                      <img className='h-40' src={TerraLogo} alt='Level' />
                    </div>
                    <div className='mt-4 flex flex-shrink-0 flex-grow justify-center lg:flex-grow-0'>
                      <img className='h-40' src={MGSDPLogo} alt='Level' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='py-10 text-center'>
            <h2 className='pb-4 text-dark-wood-800'>The Glasgow Portfolio</h2>
            <div className='py-10 px-20 bg-indigo-300 max-w-3xl mx-auto rounded-tr-[130px] rounded-bl-[130px]'>
              <p className='book-intro-sm text-dark-wood-800 pb-5 text-left'>
                Glasgow City Council and the Clyde Climate Valley are partnering with TreesAI to
                launch a portfolio of Nature Based Solutions (NbS) projects to address the city’s
                climate-related risks. Launched as a pilot at COP26, the TreeAI Glasgow Portfolio
                will fund NbS projects in Glasgow and the Clyde Valley, with a primary focus on
                alleviating the region’s stormwater and flood risks.
              </p>
              <Link to='/glasgow-nbs-portfolio'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800 '
                >
                  Glasgow Portfolio
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
