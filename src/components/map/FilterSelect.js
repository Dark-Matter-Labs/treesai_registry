import Select from 'react-select';
import PropTypes from 'prop-types';

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
