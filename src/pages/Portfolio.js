import PropTypes from 'prop-types';
import ReactMapboxGL, {
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import React, { useState, useMemo } from 'react';
import MapControlPanel from '../components/map/MapControlPanel';
import VDLLayer from '../data/VDL_selected.geojson';
import SuDSLayerJSON from '../data/SuDS_Projects.json';
import Pin from '../components/map/Pin';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import projectImg from '../images/project-default.png';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function Portfolio(props) {
  const [mapStyle, setMapStyle] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      SuDSLayerJSON.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.geometry.coordinates[0]}
          latitude={city.geometry.coordinates[1]}
          anchor='bottom'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    [],
  );

  return (
    <>
      <NavBar loggedIn={props.loggedIn} current='portfolio' />
      <ReactMapboxGL
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100vw', height: '80vh' }}
        interactiveLayerIds={['portfolio-vdl-details']}
        initialViewState={{
          longitude: -4.2518,
          latitude: 55.8642,
          zoom: 12,
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDifing
      >
        <>
          <Source id='portfolio-vdl' type='geojson' data={VDLLayer}>
            <Layer
              id='portfolio-vdl-details'
              type='fill'
              layout={{}}
              paint={{ 'fill-color': '#10B981', 'fill-opacity': 1 }}
            />
            <Layer
              id='outline'
              type='line'
              layout={{}}
              paint={{ 'line-color': '#000', 'line-width': 2 }}
            />
          </Source>
          <MapControlPanel onChange={setMapStyle} />
          <GeolocateControl position='top-left' />
          <FullscreenControl position='top-left' />
          <NavigationControl position='top-left' />
          <ScaleControl />

          {pins}

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
                {/* <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a> */}
              </div>
            </Popup>
          )}
          <div className='onMap pr- ml-20 mt-5 rounded-md bg-white text-center shadow-sm'>
            <h3 className='font-spaceBold text-primary pt-5 text-2xl font-bold tracking-tight'>
              Projects:
            </h3>
            <div className='pl-5'>
              <img
                src={projectImg}
                alt='project image'
                className='w-42 h-42 border-primary rounded-full border-8'
              />
            </div>

            <hr className='border-b-1 border-primary my-5 mx-10' />

            <div className=' mb-5 pl-10'>
              <h4 className='font-spaceBold text-primary text-left text-xl font-bold tracking-tight'>
                Impact overview
              </h4>
              <div className='pt-10 text-left'>
                <p className='text-left'>Carbon average: 00</p>
                <span>City info: 00</span>
              </div>
            </div>
          </div>
        </>
      </ReactMapboxGL>
      <Footer />
    </>
  );
}

Portfolio.propTypes = {
  loggedIn: PropTypes.bool,
};
