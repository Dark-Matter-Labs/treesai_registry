import PropTypes from 'prop-types';
import ReactMapboxGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import React, { useState, useRef } from 'react';
import SuDSLayerJSON from '../data/SuDS_Projects.json';
import Pin from '../components/map/Pin';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Dropdown from '../components/form/Dropdown';
import { get_stages } from '../utils/project_details';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

const stages = ['All'].concat(get_stages());

export default function Portfolio(props) {
  const mapRef = useRef();

  const [viewState, setViewState] = useState({
    longitude: -4.2518,
    latitude: 55.8642,
    zoom: 11,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  const [data, setData] = useState(SuDSLayerJSON);

  return (
    <>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      <Dropdown
        span='sm:col-span-3'
        label='city'
        title='Filter by Stage'
        type='general'
        options={stages}
        onChange={(e) => {
          if (e.target.value === 'All') {
            setData(SuDSLayerJSON);
          } else {
            const filteredData = SuDSLayerJSON.filter((item) =>
              item.properties.Stage.includes(e.target.value),
            );
            setData(filteredData);
          }
        }}
      />
      <div className='grid grid-cols-3'>
        <div>
          <ul role='list' className='divide-y divide-gray-200 '>
            {data.map((message) => (
              <li
                key={message.properties.id}
                className='relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'
                onClick={() => {
                  mapRef.current?.flyTo({
                    center: [message.geometry.coordinates[0], message.geometry.coordinates[1]],
                    duration: 2000,
                    zoom: 15,
                  });
                  setPopupInfo(message);
                }}
              >
                <div className='flex justify-between space-x-3'>
                  <div className='min-w-0 flex-1'>
                    <a href='#' className='block focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {message.properties.Name}
                      </p>
                      <p className='text-sm text-gray-500 truncate'>{message.properties.Stage}</p>
                    </a>
                  </div>
                </div>
                <div className='mt-1'>
                  <p className='line-clamp-2 text-sm text-gray-600'>
                    {message.properties.Typology}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='col-span-2'>
          <ReactMapboxGL
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle='mapbox://styles/mapbox/light-v10'
            style={{ width: '100vw', height: '100vh' }}
          >
            <>
              {data.map((city, index) => (
                <Marker
                  key={`marker-${index}`}
                  color='#828784'
                  longitude={city.geometry.coordinates[0]}
                  latitude={city.geometry.coordinates[1]}
                  anchor='bottom'
                  onClick={(e) => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                    mapRef.current?.flyTo({
                      center: [city.geometry.coordinates[0], city.geometry.coordinates[1]],
                      duration: 2000,
                      zoom: 15,
                    });
                    setPopupInfo(city);
                  }}
                >
                  <Pin />
                </Marker>
              ))}

              {popupInfo && (
                <Popup
                  anchor='top'
                  longitude={Number(popupInfo.geometry.coordinates[0])}
                  latitude={Number(popupInfo.geometry.coordinates[1])}
                  onClose={() => setPopupInfo(null)}
                >
                  <div>
                    Name: <b>{popupInfo.properties.Name}</b> <br />
                    Stage: <b>{popupInfo.properties.Stage}</b> <br />
                    Typology: <b>{popupInfo.properties.Typology}</b> <br />
                    Developer: <b>{popupInfo.properties.Developer}</b> <br />
                    Start date: <b>{popupInfo.properties.Start_date}</b> <br />
                  </div>
                </Popup>
              )}
            </>
          </ReactMapboxGL>
        </div>
      </div>

      <Footer />
    </>
  );
}

Portfolio.propTypes = {
  loggedIn: PropTypes.bool,
};
