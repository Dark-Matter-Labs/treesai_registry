import Select from 'react-select';
import PropTypes from 'prop-types';

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white',  fontFamily: 'ABCFavorit', borderRadius: '10px' }),
  menu: (styles) => ({...styles, fontFamily: 'ABCFavorit',  borderRadius: '10px'}),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      borderRadius: '10px',
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#2F3130'
        : isFocused
        ? '#CFD0CF'
        : undefined,

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : '#CFD0CF'
          : undefined,
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      borderRadius: '10px',
      backgroundColor: '#CFD0CF'
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    borderRadius: '10px',
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: '10px',
    color: data.color,
    ':hover': {
      backgroundColor: '#CFD0CF',
      color: '#2F3130',
    },
  }),
};

export default function FilterSelect(props) {
  return (
    <>
      <label htmlFor={props.name} className='book-info-md pl-5 text-white-200'>
        {props.title}
      </label>
      <Select
        options={[{ label: 'Select All', value: 'all' }, ...props.options]}
        isMulti
        name={props.name}
        className='basic-multi-select medium-intro-sm block w-full rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-dark-wood-800'
        classNamePrefix='select'
        onChange={props.onChange}
        value={props.value ? props.value : null}
        styles={colourStyles}
      />
    </>
  );
}

FilterSelect.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.array,
};
