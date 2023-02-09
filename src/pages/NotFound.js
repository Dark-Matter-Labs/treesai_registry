import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className='bg-white-300 '>
      <NavBar current='invest' />
      <div className='global-margin'>
        <div className='title-box mt-5 py-20 bg-learn'>
          <div className='py-5'>
            <div className='bg-dark-wood-800 rounded-br-[100px] px-8 py-20 max-w-sm mx-auto'>
              <h1 className='text-center text-white-200'>Oops! You seem to be lost.</h1>
            </div>
          </div>
          <div className='mt-14 self-end'>
            <div className='title-box-info mt-10 bg-dark-wood-800 px-40 py-12 text-center '></div>
          </div>
        </div>
        <div className='grid pb-10'>
          <div className='place-self-center pt-4'>
            <Link to='/'>
              <button
                type='button'
                className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800'
              >
                Home
              </button>
            </Link>
            <Link to='/explore'>
              <button
                type='button'
                className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
              >
                NbS Map
              </button>
            </Link>
            <Link to='/develop'>
              <button
                type='button'
                className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
              >
                Develop
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
