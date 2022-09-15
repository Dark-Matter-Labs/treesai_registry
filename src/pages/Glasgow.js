import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import sdgs1 from '../images/sdgs_1.png';
import sdgs2 from '../images/sdgs_2.png';
import sdgs3 from '../images/sdgs_3.png';
import sdgs4 from '../images/sdgs_4.png';
import sdgs5 from '../images/sdgs_5.png';
import GCCLogo from '../images/partner_logos/GCC.png';
import CCFLogo from '../images/partner_logos/CCF.png';
import TerraLogo from '../images/partner_logos/terra.png';
import MGSDPLogo from '../images/partner_logos/MGSDP.png';
import Footer from '../components/Footer';
import MapVideo from '../images/NbSMap.webm';
import loadingPlaceholder from '../images/loadingPlaceholder.png';

export default function Glasgow() {
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar current='invest' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-dark-wood-800 py-20'>
          <h1 className='text-center text-white-200'>Glasgow NbS Portfolio</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 mt-5 gap-x-4'>
          <div className='bg-green-600 rounded-br-[100px] px-8 '>
            <h2 className='text-white-200 pt-4'>Key Information</h2>
          </div>
          <div className='col-span-2 '>
            <div className='sm:flex sm:flex-col'>
              <div className=''>
                <div className='inline-block sm:min-w-full align-middle'>
                  <div className='overflow-hidden border border-green-600 rounded-br-[100px] '>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-green-500'>
                        <tr className='divide-x divide-green-600'>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-4 text-left medium-intro-md text-dark-wood-800 sm:pl-6'
                          >
                            Key impacts
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left medium-intro-md text-dark-wood-800'
                          >
                            Investment Target
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left medium-intro-md text-dark-wood-800'
                          >
                            Portfolio Size
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-4 text-left medium-intro-md text-dark-wood-800'
                          >
                            Start Date
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-4 text-left medium-intro-md text-dark-wood-800 sm:pr-6'
                          >
                            Investment Period
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white-200'>
                        <tr className='divide-x divide-gray-200'>
                          <td className='whitespace-nowrap py-4 pl-4 pr-4 book-intro-md text-dark-wood-800 sm:pl-6'>
                            <ul className='list-disc ml-2'>
                              <li>Carbon Sequestration</li>
                              <li>Natural Flood Management</li>
                              <li>Green Job Creation</li>
                            </ul>
                          </td>
                          <td className='whitespace-nowrap p-4 book-intro-md text-dark-wood-800'>
                            £5M
                          </td>
                          <td className='whitespace-nowrap p-4 book-intro-md text-dark-wood-800'>
                            30-40 NbS projects
                          </td>
                          <td className='whitespace-nowrap p-4 book-intro-md text-dark-wood-800'>
                            2023
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-4 book-intro-md text-dark-wood-800 '>
                            5 years
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 mt-10  gap-x-4'>
          <div className='bg-indigo-600 rounded-br-[100px] px-8 '>
            <h2 className='text-white-200 pt-4'>Problem </h2>
          </div>
          <div className='col-span-2 border border-indigo-600 sm:rounded-br-[100px] sm:rounded-tr-[100px] px-20 py-10 bg-white-200'>
            <p className='book-intro-md text-dark-wood-800 pb-4'>
              Glasgow is the UK’s third wettest city – rainfall often overwhelms its Victorian sewer
              causing a 40% increase in raw sewage. There’s post-industrial, contaminated land and
              with 99,000 properties at high risk of flooding, it’s projected that flooding damage
              will cost the region £100 million a year by 2050. Glasgow also faces multiple public
              health issues, with a 15% higher mortality rate than other UK cities.
            </p>
            <p className='book-intro-md text-dark-wood-800'>
              Glasgow’s existing urban nature plays a critical role in mitigating these risks, but
              with much of its urban forest ageing and dying – it is at a critical phase. The city
              aims to plant 18 million trees by 2030, but requires the infrastructure to both
              coordinate and finance its afforestation targets.{' '}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 mt-10 gap-x-4'>
          <div className='bg-green-600 rounded-br-[100px] px-8 '>
            <h2 className='text-white-200 pt-4'>Portfolio & Impact </h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-0 justify-items-start px-10'>
              <div>
                <img src={sdgs1} width='78px' />
              </div>
              <div>
                <img src={sdgs2} width='78px' />
              </div>
              <div>
                <img src={sdgs3} width='78px' />
              </div>
              <div>
                <img src={sdgs4} width='78px' />
              </div>
              <div>
                <img src={sdgs5} width='78px' />
              </div>
            </div>
          </div>
          <div className='col-span-2 border border-green-600 sm:rounded-br-[100px] sm:rounded-tr-[100px] px-20 py-10 bg-white-200'>
            <p className='book-intro-md text-dark-wood-800 pb-4'>
              Launched at COP26, the Glasgow Pilot portfolio aims to improve stormwater retention
              and natural flood management – reducing the cost of flooding damage and increasing
              carbon sequestration
            </p>
            <p className='book-intro-md text-dark-wood-800 pb-4'>
              The portfolio aims to deliver social, healthcare and economic benefits to local
              communities creating green jobs, access to green spaces, improving mental well-being
              and increasing local biodiversity.
            </p>
            <p className='book-intro-md text-dark-wood-800 pb-4'>
              The portfolio contains Street Trees, Woodland, Sustainable Urban Drainage systems
              (SUDs) and the preservation of Trees in Vacant and Derelict Land. All include
              community-led stewardship practices
            </p>
            <p className='book-intro-md text-dark-wood-800 pb-4'>
              The portfolio aims to raise £5M during its pilot (2022-2027), through public and
              private sources.
            </p>
          </div>
        </div>

        <div className='title-box-alter mt-4 bg-dark-wood-800 py-20 px-20 mt-10'>
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div>
              <h2 className='text-white-200 pt-4'>Glasgow NbS Map </h2>
              <Link to='/explore'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent  bg-white-200 my-10 py-2 px-8 text-dark-wood-800 shadow-sm hover:bg-dark-wood-700 '
                >
                  NbS Map
                </button>
              </Link>
              <Link to='/learn-more'>
                <button
                  type='button'
                  className='ml-4 bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-white-200 my-10 py-2 px-8 text-dark-wood-800 shadow-sm hover:bg-dark-wood-700 '
                >
                  Learn More
                </button>
              </Link>
            </div>
            <div className='col-span-2'>
              <video className='' autoPlay loop muted poster={loadingPlaceholder}>
                <source src={MapVideo} type='video/webm' />
              </video>
            </div>
          </div>
        </div>

        <div className='mt-10 text-center'>
          <h2 className='text-dark-wood-800'>Who’s involved: </h2>
          <div className='title-box-alter bg-green-400 border border-green-600 mt-5 py-10 px-10'>
            <div className=''>
              <div className=''>
                <div className='mt-8 flow-root self-center lg:mt-0'>
                  <div className='-mt-4 -ml-8 flex flex-wrap justify-center lg:-ml-4'>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img className='h-40' src={GCCLogo} alt='Glasgow City Council Logo' />
                    </div>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img className='h-40' src={CCFLogo} alt='Tuple' />
                    </div>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img className='h-40' src={TerraLogo} alt='Level' />
                    </div>
                    <div className='mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0'>
                      <img className='h-40' src={MGSDPLogo} alt='Level' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-20 mb-20 '>
          <h2 className='text-dark-wood-800 pb-5'>
            New partners are welcome, interested in finding out more? Get involved:{' '}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-0'>
              <div className='bg-indigo-500 px-8 py-10 text-center'>
                <h2 className='text-white-200 text-left'>Investors</h2>
                <Link to='/invest'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                  >
                    Invest in a Portfolio
                  </button>
                </Link>
              </div>
              <div className='bg-indigo-400 rounded-tr-[100px] px-8 py-10'>
                <p className='text-white-200 medium-intro-md text-left px-5'>
                  Are you a Glasgow-based organisation looking to mitigate your exposure to climate
                  and nature-related risks or an investor looking to invest in NbS with
                  environmental and social returns?
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-0'>
              <div className='bg-green-500 px-8 py-10  text-center'>
                <h2 className='text-white-200 text-left'>Project Developers </h2>
                <Link to='/develop'>
                  <button
                    type='button'
                    className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                  >
                    Add a Project
                  </button>
                </Link>
              </div>
              <div className='bg-green-400 rounded-tr-[100px] px-8 py-10'>
                <p className='text-dark-wood-800 medium-intro-md text-left px-5'>
                  Are you an organisation developing a Glasgow-based NbS project that fits the
                  portfolio’s impact targets?
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
