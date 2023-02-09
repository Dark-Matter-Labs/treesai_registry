import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import teamImage from '../images/team.jpg';

export default function Contact({ loggedIn }) {
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar loggedIn={loggedIn} current='learn' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-dark-wood-800 py-20'>
          <h1 className='text-center text-white-200'>Get in contact</h1>
        </div>

        <div className='py-10 px-20 bg-white-200 text-center'>
          <h2 className='text-green-600 pb-4'> Contact the team</h2>
          <p className='book-intro-md text-dark-wood-800 pb-6'>Want to know more about TreesAI?</p>
          <p className='book-intro-md text-dark-wood-800'>
            You can email us at{' '}
            <a href='mailto:treesai@darkmatterlabs.org' className='text-green-600'>
              treesai@darkmatterlabs.org
            </a>{' '}
          </p>
        </div>
        <div className='pb-20 sm:px-40 '>
          <img src={teamImage} className='rounded-[100px] ' alt='TreesAI team members image' />
        </div>

        <Footer />
      </div>
    </div>
  );
}

Contact.propTypes = {
  loggedIn: PropTypes.bool,
};
