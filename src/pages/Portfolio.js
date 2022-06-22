import ReactMapboxGL, { Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { useState, useCallback } from "react";
import GlasgowJSON from "../data/VDL_selected.geojson";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export default function Portfolio() {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  return (
    <>
      <NavBar current="portfolio" />
      <ReactMapboxGL
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100vw", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        interactiveLayerIds={["portfolio-vdl-details"]}
        onMouseMove={onHover}
        initialViewState={{
          longitude: -4.2518,
          latitude: 55.8642,
          zoom: 12,
        }}
      >
        <Source id="portfolio-vdl" type="geojson" data={GlasgowJSON}>
          <Layer
            id="portfolio-vdl-details"
            type="fill"
            layout={{}}
            paint={{ "fill-color": "#10B981", "fill-opacity": 1 }}
          />
          <Layer
            id="outline"
            type="line"
            layout={{}}
            paint={{ "line-color": "#000", "line-width": 2 }}
          />
        </Source>
        {hoverInfo && (
          <div
            className="tooltip"
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>Name: {hoverInfo.feature.properties.NAME}</div>
            <div>Site code: {hoverInfo.feature.properties.SITECODE}</div>
            <div>Ward: {hoverInfo.feature.properties.WARD}</div>
            <div>Area in Ha: {hoverInfo.feature.properties.Area_Hecta}</div>
          </div>
        )}
      </ReactMapboxGL>
      <Footer />
    </>
  );
}
