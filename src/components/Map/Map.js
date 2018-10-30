import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from "./Marker/Marker"

const Map = (props) => {
  return <div style={{height: '100vh', width: '100%'}}>
    <GoogleMapReact
      bootstrapURLKeys={{key: 'AIzaSyDJtTqqrF_Sjt_aFLtWLqnSZ_1d93sMmKc'}}
      center={props.center}
      zoom={props.zoom}
      onChange={props.change}>
      {props.markers.map(item => {
        return <Marker key={item.id} lat={item.coord.Lat} lng={item.coord.Lon} weatherInfo={item}/>;
      })}
    </GoogleMapReact>
  </div>;
};

export default Map;