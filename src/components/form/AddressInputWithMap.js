import PropTypes from 'prop-types';
import React from 'react';
import Map from 'react-map-gl';
import GeocoderControl from '../map/GeocoderControl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function AddressInputWithMap(props) {
  // function to handle the geocoder result
  const handleResult = (result) => {
    sessionStorage.setItem('lat', result.center[1]);
    sessionStorage.setItem('lng', result.center[0]);
    sessionStorage.setItem('address', result.place_name);
  };

  return (
    <div className={props.span}>
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeocoderControl
          mapboxAccessToken={MAPBOX_TOKEN}
          position='top-left'
          onResult={function (e) {
            handleResult(e.result);
          }}
        />
      </Map>
    </div>
  );
}

AddressInputWithMap.propTypes = {
  span: PropTypes.string,
  onResult: PropTypes.func,
};
