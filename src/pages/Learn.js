import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import coverImage from '../images/TreesAICover.png';

export default function Learn() {
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar current='learn' />
      <div className='bg-white-200 global-margin bg-pattern flex flex-col'>
        <div className='title-box mt-5 py-20 bg-learn'>
          <div className='py-24'>
            <h1 className='text-center text-white-200'>Learn more about TreesAI</h1>
          </div>
          <div className='mt-14 self-end'>
            <div className='title-box-info mt-10 bg-dark-wood-800 px-40 py-10 text-center '>
              <p className='medium-intro-md mt-1 text-white-200'>
                Do you want to know more about this project?
              </p>
            </div>
          </div>
        </div>

        <div className='py-10 text-center'>
          <h3 className='text-dark-wood-800 pb-10'>Revaluing nature as urban infrastructure. </h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 bg-white-200 border border-dark-wood-800 rounded-[50px] px-10 py-10'>
            <div className='text-left px-10 place-self-center'>
              <p className='book-intro-lg text-dark-wood-800'>
                We’re collaborating with stakeholders and local communities to design new
                technologies and build open source services that help establish nature as a part of
                urban infrastructure.{' '}
              </p>
              <a href='https://treesasinfrastructure.com/'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 my-10 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700 '
                >
                  Find out more here
                </button>
              </a>
            </div>
            <div className='px-10 col-span-2'>
              <img src={coverImage} alt='TreesAI website cover image' />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
