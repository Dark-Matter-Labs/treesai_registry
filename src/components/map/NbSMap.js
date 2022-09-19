import React, { useState } from 'react';
import ReactMapboxGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Pin from './Pin';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function NbSMap(props) {
  const [viewState, setViewState] = useState({
    longitude: -4.16,
    latitude: 55.85,
    zoom: 11,
  });

  return (
    <ReactMapboxGL
      ref={props.mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={props.mapLayer}
      style={{ width: '100vw', height: '100vh', overflowY: 'hidden' }}
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
              e.originalEvent.stopPropagation();
              props.selectProject(city);
            }}
          >
            <Pin
              isFeatured={city.properties.is_featured}
              inPortfolio={city.properties.portfolio_A}
            />
          </Marker>
        ))}

        {props.popupInfo && (
          <Popup
            anchor='right'
            longitude={Number(props.popupInfo.geometry.coordinates[0])}
            latitude={Number(props.popupInfo.geometry.coordinates[1])}
            onClose={() => props.setPopupInfo(null)}
            className=''
          >
            <div className='medium-intro-sm text-white-200 bg-green-600 p-4 rounded-t-3xl'>
              {props.popupInfo.properties.project_name}
            </div>
            <div className='medium-intro-sm'>
              <table className='divide-y divide-green-300'>
                <tbody className='divide-y divide-green-300 bg-white-200'>
                  <tr>
                    <td className='book-info-sm  py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                      District:
                    </td>
                    <td className='book-info-sm  px-3 py-4 text-green-600'>
                      {props.popupInfo.properties.community_council}
                    </td>
                  </tr>
                  <tr>
                    <td className='book-info-sm  py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                      Typology:
                    </td>
                    <td className='book-info-sm px-3 py-4 text-green-600'>
                      {props.popupInfo.properties.typology}
                    </td>
                  </tr>
                  <tr>
                    <td className='book-info-sm  py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                      Activity
                    </td>
                    <td className='book-info-sm  px-3 py-4 text-green-600'>
                      {props.popupInfo.properties.activity}
                    </td>
                  </tr>
                  <tr>
                    <td className='book-info-sm  py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                      Project stage:
                    </td>
                    <td className='book-info-sm  px-3 py-4 text-green-600'>
                      {props.popupInfo.properties.stage}
                    </td>
                  </tr>
                  <tr>
                    <td className='book-info-sm py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                      Project developer:
                    </td>
                    <td className='book-info-sm  px-3 py-4 text-green-600'>
                      {props.popupInfo.properties.project_developer}
                    </td>
                  </tr>
                </tbody>
              </table>
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
};
