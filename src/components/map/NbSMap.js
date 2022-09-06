import React, { useState } from 'react';
import ReactMapboxGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Pin from './Pin';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function NbSMap(props) {
  const [viewState, setViewState] = useState({
    longitude: -4.2518,
    latitude: 55.8642,
    zoom: 11,
  });
  return (
    <ReactMapboxGL
      ref={props.mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle='mapbox://styles/mapbox/light-v10'
      style={{ width: '100vw', height: '100vh' }}
    >
      <>
        {props.data.map((city, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={city.geometry.coordinates[0]}
            latitude={city.geometry.coordinates[1]}
            anchor='bottom'
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              console.log(e);
              e.originalEvent.stopPropagation();
              props.selectProject(city);
            }}
          >
            <Pin isActive={true} />
          </Marker>
        ))}

        {props.popupInfo && (
          <Popup
            anchor='top'
            longitude={Number(props.popupInfo.geometry.coordinates[0])}
            latitude={Number(props.popupInfo.geometry.coordinates[1])}
            onClose={() => props.setPopupInfo(null)}
            className=''
          >
            <div className='medium-intro-sm text-white-200 bg-green-600 p-4 rounded-t-3xl'>
              {props.popupInfo.properties.project_name}
            </div>
            <div className='py-2 px-2 medium-intro-sm'>
              Stage: <b>{props.popupInfo.properties.stage}</b> <br />
              Typology: <b>{props.popupInfo.properties.typology}</b> <br />
              Developer: <b>{props.popupInfo.properties.project_developer}</b> <br />
            </div>
          </Popup>
        )}
      </>
    </ReactMapboxGL>
  );
}

NbSMap.propTypes = {
  mapRef: PropTypes.object,
  data: PropTypes.array,
  selectProject: PropTypes.func,
  popupInfo: PropTypes.object,
  setPopupInfo: PropTypes.func,
};
