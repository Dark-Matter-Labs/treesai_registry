import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ValueDisplay(props) {
  return (
    <div
      className={classNames(
        props.disabled ? 'border-dark-wood-600' : 'border-green-600',
        'flex flex-row gap-4 items-center justify-around border rounded-30 py-2 px-2 bg-white-300 ',
      )}
    >
      {props.value > 0 ? (
        <span className='medium-intro-sm rounded-full bg-green-600 px-8 py-10 text-white'>
          {props.value}
        </span>
      ) : (
        <span
          className={classNames(
            props.disabled ? 'bg-dark-wood-500' : 'bg-green-600',
            'text-white medium-intro-sm rounded-full px-8 py-10 ',
          )}
        >
          0.00
        </span>
      )}

      <span
        className={classNames(
          props.disabled ? 'text-dark-wood-500' : 'text-green-600',
          'bold-intro-md pt-2',
        )}
      >
        {props.label}
      </span>
    </div>
  );
}

ValueDisplay.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
