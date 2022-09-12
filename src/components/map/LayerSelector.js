import PropTypes from 'prop-types';

const layers = [
  { label: 'Basic', value: 'mapbox://styles/mapbox/light-v10' },
  { label: 'Navigation', value: 'mapbox://styles/mapbox/navigation-day-v1' },
  { label: 'Satellite', value: 'mapbox://styles/mapbox/satellite-v9' },
];

export default function LayerSelector(props) {
  return (
    <div className='absolute z-50 bottom-0 right-0 mx-5 mb-20'>
      <label htmlFor='map-layers' className='book-info-md text-dark-wood-200'>
        Map Layers
      </label>
      <select
        id='layers'
        name='layers'
        className='medium-intro-sm block w-full rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-dark-wood-600'
        defaultValue='mapbox://styles/mapbox/dark-v10'
        onChange={(e) => {
          props.setMapLayer(e.target.value);
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
  setMapLayer: PropTypes.func,
};
