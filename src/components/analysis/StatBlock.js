import PropTypes from 'prop-types';

export default function StatBlock({ highlightColour, label, stat }) {
  return (
    <div className='bg-white px-4 py-4 rounded-[30px] flex justify-between items-center'>
      <span className='text-dark-wood-800 medium-intro-lg'>{label}</span>
      {highlightColour === 'dark' ? (
        <span className='text-white-200 rounded-full px-4 py-2 medium-intro-lg bg-dark-wood-800'>
          {stat}
        </span>
      ) : (
        <span className='text-white-200 rounded-full px-4 py-2 medium-intro-lg bg-green-600'>
          {stat}
        </span>
      )}
    </div>
  );
}

StatBlock.propTypes = {
  highlightColour: PropTypes.string,
  label: PropTypes.string,
  stat: PropTypes.number,
};
