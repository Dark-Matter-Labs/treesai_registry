import React, { useState, useEffect } from 'react';
import ReactMapboxGL, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Pin from './Pin';
import GeocoderControl from './GeocoderControl';
import {
  SocialDeprivationStyles,
  LocationScoringStyles,
  SubBasinStyles,
} from '../../utils/map_data_layers';

// get data layers
import SocialDeprivation from '../../data/SocialDeprivation.geojson';
import SubBasin from '../../data/SubBasin.geojson';
import LocationScoring from '../../data/Location_scoring_councils.geojson';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function NbSMap(props) {
  const [viewState, setViewState] = useState({
    longitude: -4.28,
    latitude: 55.85,
    zoom: 11,
  });

  useEffect(() => {
    if (props.mapRef.current !== null) {
      props.mapRef.current.getMap().resize();
    }
  }, [props.height]);

  return (
    <ReactMapboxGL
      ref={props.mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      // TODO: refactor this when other TIFF layers are working
      mapStyle={
        props.mapDataLayer === 'mapbox://styles/gurden/cla6q7i2y00fb15ph0j37y0b4'
          ? props.mapDataLayer
          : 'mapbox://styles/mapbox/light-v10'
      }
      style={Object.assign({ width: '100vw', overflowY: 'hidden' }, { height: props.height })}
    >
      <NavigationControl position='bottom-right' />
      <FullscreenControl position='bottom-right' />
      <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position='bottom-right' />
      {props.mapDataLayer === 'Social Deprivation' && (
        <Source type='geojson' data={SocialDeprivation}>
          <Layer {...SocialDeprivationStyles} />
        </Source>
      )}
      {props.mapDataLayer === 'Sub Basin' && (
        <Source type='geojson' data={SubBasin}>
          <Layer {...SubBasinStyles} />
        </Source>
      )}
      {props.mapDataLayer === 'Location Scoring' && (
        <Source type='geojson' data={LocationScoring}>
          <Layer {...LocationScoringStyles} />
        </Source>
      )}

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
              e.originalEvent.stopPropagation();
              props.selectProject(city);
            }}
          >
            <Pin />
          </Marker>
        ))}

        {props.popupInfo && (
          <Popup
            anchor='bottom'
            longitude={Number(props.popupInfo.geometry.coordinates[0])}
            latitude={Number(props.popupInfo.geometry.coordinates[1])}
            onClose={() => props.setPopupInfo(null)}
            className=''
          >
            <div className='medium-intro-sm text-white-200 bg-green-600 p-4 rounded-[38px] text-center'>
              {props.popupInfo.properties.project_name}
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
  mapLayer: PropTypes.string,
  mapDataLayer: PropTypes.string,
  height: PropTypes.string,
};
