import PropTypes from 'prop-types';

const layers = [
  { label: 'Basic', value: 'Basic' },
  { label: 'Social Deprivation', value: 'Social Deprivation' },
  { label: 'Sub Basin', value: 'Sub Basin' },
  { label: 'Location Scoring', value: 'Location Scoring' },
  { label: 'Canopy Cover', value: 'mapbox://styles/gurden/cla6q7i2y00fb15ph0j37y0b4' },
];

export default function LayerSelector(props) {
  return (
    <div className='absolute z-50 top-80 right-0 mx-5'>
      <label htmlFor='map-layers' className='book-info-md text-dark-wood-200'>
        Map Layers
      </label>
      <select
        id='layers'
        name='layers'
        className='medium-intro-sm block w-full rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-dark-wood-600'
        defaultValue='Basic'
        onChange={(e) => {
          props.setMapDataLayer(e.target.value);
        }}
      >
        {layers.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

LayerSelector.propTypes = {
  setMapDataLayer: PropTypes.func,
};
