import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SectionHeader from '../components/SectionHeader';
import sdgs1 from '../images/sdgs_1.png';
import sdgs2 from '../images/sdgs_2.png';
import sdgs3 from '../images/sdgs_3.png';
import sdgs4 from '../images/sdgs_4.png';
import sdgs5 from '../images/sdgs_5.png';
import Footer from '../components/Footer';

export default function Invest() {
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar current='invest' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-4 grid grid-cols-1 bg-indigo-600 pt-8'>
          <div className='place-self-end pr-10'>
            <button
              type='button'
              className='w-lg bold-intro-sm flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-4 text-white-200 shadow-sm hover:bg-green-800'
            >
              Want to know more?
            </button>
          </div>
          <div className='title-text-container text-background-shape py-24'>
            <h1 className='text-center text-indigo-600'>Invest</h1>
          </div>

          <div className='title-box-info mt-10 bg-green-600 px-40 py-10 text-center'>
            <p className='medium-intro-md mt-1 text-dark-wood-800'>
              Welcome to our NbS Portfolio Manager
            </p>
          </div>
        </div>

        <div className='my-10 grid'>
          <div className='book-intro-md max-w-3xl place-self-center text-dark-wood-700'>
            <p className='pb-4'>
              Are you looking for NbS investments that deliver multiple benefits?
            </p>
            <hr className='border-dark-wood-600' />
            <p className='pt-4 '>
              Below you can check out existing NbS portfolios, see what’s in them, their modelled
              impact, who has been involved so far – and invest in them!{' '}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 mt-5 gap-x-4'>
          <div className='bg-dark-wood-800 rounded-br-[100px] px-8 '>
            <h2 className='text-white-200 pt-4'>Glasgow NbS Portfolio</h2>
          </div>
          <div className='col-span-2 '>
            <div className='sm:flex sm:flex-col'>
              <div className=''>
                <div className='inline-block sm:min-w-full align-middle'>
                  <div className='overflow-hidden border border-dark-wood-600 rounded-br-[100px] '>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-dark-wood-300'>
                        <tr className='divide-x divide-dark-wood-600'>
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
                        <tr className='divide-x divide-dark-wood-600'>
                          <td className='whitespace-nowrap py-4 pl-4 pr-4 book-intro-md text-dark-wood-800 sm:pl-6'>
                            <ul className='list-disc ml-2 medium-intro-md'>
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

        <div className='py-10'>
          <SectionHeader title='Glasgow Portfolio' type='typology' />

          <div className='grid grid-cols-1 sm:grid-cols-2 mb-20'>
            <div className='bg-green-400 px-20 py-10'>
              <p className='text-dark-wood-800 medium-intro-lg pb-4'>Impact</p>
              <p className='text-dark-wood-800 medium-intro-md pb-4 max-w-lg'>
                This portfolio aims to improve stormwater retention and natural flood management to
                reduce cost of flooding and increase carbon sequestration.
              </p>
              <p className='text-dark-wood-800 medium-intro-md max-w-lg'>
                The portfolio also aims to deliver co-benefits to local communities, such as access
                to green space and improved mental wellbeing.
              </p>
            </div>

            <div className='bg-green-300 px-20 py-10'>
              <p className='text-dark-wood-800 medium-intro-lg pb-4'>Portfolio Overview</p>
              <p className='text-dark-wood-800 medium-intro-md max-w-lg'>
                The projects in the portfolio include
              </p>
              <ul className='list-disc ml-2 medium-intro-md'>
                <li>5,000+ new trees</li>
                <li>15ha+ new woodland</li>
                <li>30ha+ trees preserved</li>
                <li>SUDs in Vulnerable Areas</li>
              </ul>
            </div>

            <div className='bg-dark-wood-400 px-20 py-10'>
              <p className='text-dark-wood-800 medium-intro-lg pb-2'>Related SDGs:</p>
              <div className='grid grid-cols-1 sm:grid-cols-5 gap-x-0 justify-items-start pr-10'>
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
              <p className='text-dark-wood-800 medium-intro-lg pt-4'>Modelled Impacts:</p>
              <ul className='list-disc ml-2 pt-4 medium-intro-md'>
                <li>Total CO2 Sequestered: 812,240 (Kgs)</li>
                <li>Total Carbon Stored: 43,757,051 (Kgs)</li>
                <li>Total Improvement on stormwater retention: 1,121,761 (1000L/m2)</li>
                <li>Total Avoided stormwater runoff: 295,640 (1000L/m2)</li>
                <li>Annual hourly average PM10 % improvement: 4.69%</li>
              </ul>
            </div>

            <div className='bg-dark-wood-300 px-20 py-10'>
              <p className='text-dark-wood-800 medium-intro-lg pb-4'>Portfolio Type</p>
              <p className='text-dark-wood-800 medium-intro-md pb-8 max-w-lg'>
                Investors will gain access to financial and environmental returns through
                outcomes-based financing instruments.
              </p>
              <p className='text-dark-wood-800 medium-intro-lg pb-4'>How the portfolio’s built</p>
              <p className='text-dark-wood-800 medium-intro-md pb-8 max-w-lg'>
                Combining TreesAI impact assesment tools with outcomes-based financing to optimise
                project selection and boost environmental, social and economic impact.
              </p>
              <p className='text-dark-wood-800 medium-intro-lg pb-4'>
                Who’s currently involved in the pilot:
              </p>
              <p className='text-dark-wood-800 medium-intro-md max-w-lg'>
                Clyde Climate Forest, Flood Re (research partner), Glasgow City Council,
                Metropolitan Glasgow Strategic Drainage Partnership, Nationwide, Scottish Water
              </p>
            </div>

            <div className='bg-indigo-600 px-20 py-10 rounded-bl-[100px]'>
              <div className='grid grid-cols-2  justify-items-center place-content-around'>
                <div>
                  <p className='text-white-200 medium-intro-md pb-4 max-w-lg'>
                    Find out more about the Glasgow Portfolio
                  </p>
                </div>
                <div>
                  <Link to='/glasgow-nbs-portfolio'>
                    <button
                      type='button'
                      className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                    >
                      View Portfolio
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className='bg-indigo-500 px-20 py-10 rounded-br-[100px]'>
              <div className='grid grid-cols-2  justify-items-center place-content-around'>
                <div>
                  <p className='text-white-200 medium-intro-md pb-4 max-w-lg'>
                    Get in touch about investing
                  </p>
                </div>
                <div>
                  <Link to='/contact'>
                    <button
                      type='button'
                      className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                    >
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
