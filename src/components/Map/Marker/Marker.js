import React from "react";
import './Marker.scss';

const Marker = ({weatherInfo}) => {
  const style = {
    backgroundImage: 'url(http://openweathermap.org/img/w/' + weatherInfo.weather[0].icon  + '.png)'
  };
  return <div className={'marker'} style={style}>
    <div className="marker__description">
      <h3>{weatherInfo.name}</h3>
      <p>Temperature: {weatherInfo.main.temp}</p>
      <p>Pressure: {weatherInfo.main.pressure}</p>
      <p>Humidity: {weatherInfo.main.humidity}</p>
    </div>
  </div>
};

export default Marker;