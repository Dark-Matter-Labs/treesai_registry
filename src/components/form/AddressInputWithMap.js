import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Map from 'react-map-gl';
import GeocoderControl from '../map/GeocoderControl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function AddressInputWithMap(props) {
  const [coordinates, setCoordinates] = React.useState({});

  useEffect(() => {
    if (coordinates) {
      sessionStorage.setItem('lat', coordinates.lat);
      sessionStorage.setItem('lng', coordinates.lng);
    }
  }, [coordinates]);

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
            setCoordinates({ lat: e.result.center[1], lng: e.result.center[0] });
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
