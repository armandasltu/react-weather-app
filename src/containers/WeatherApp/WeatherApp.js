import React, {Component} from 'react';
import GoogleMap from "../../components/Map/Map";
import Geocode from "react-geocode";
import {fitBounds} from "google-map-react/utils";
import "./WeatherApp.scss";
import "../../components/UI/Input/Input.scss";
import Accordion from "../../components/Accordion/Accordion";
import NavigationToggle from "../../components/UI/NavigationToggle/NavigationToggle";
import ListItem from "./ListItem/ListItem";
import Button from "../../components/UI/Button/Button";
import axios from "axios";

Geocode.setApiKey("AIzaSyDJtTqqrF_Sjt_aFLtWLqnSZ_1d93sMmKc");
// Geocode.enableDebug();

class WeatherApp extends Component {

  state = {
    showNavigation: true,
    weatherStations: [],
    location: [],
    savedWeatherStations: [],
    countries: ['Latvia', 'Lithuania', 'Estonia', 'Russia', 'United States', 'Italy'],
    size: {
      width: 560,
      height: 583,
    },
    center: {
      lat: 54.687157,
      lng: 25.279652,
    },
    zoom: 4,
    initialPosition: null,
    search: {
      country: '',
      city: '',
    }
  };

  componentDidMount() {
    const savedLocation = localStorage.getItem('weatherlocations');
    if (savedLocation) {
      this.setState({savedWeatherStations: JSON.parse(savedLocation)});
    }
  }

  loadWeatherStations = ({ne, sw}) => {
    const coordinates = [ne.lng, ne.lat, sw.lng, sw.lat, this.state.zoom];
    axios.get('http://api.openweathermap.org/data/2.5/box/city', {
      params: {
        bbox: coordinates.join(','),
        cluster: 'yes',
        format: 'json',
        appid: '068fa426436e6285982b85ab0f1c3f83'
      }
    }).then((response) => {
      if (response.data.list) {
        this.setState({weatherStations: response.data.list});
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  loadLocationByCoordinates = (lat, lon) => {
    const location = {
      lat: lat,
      lng: lon
    };
    this.setState({
      location: location,
      center: location,
      zoom: 10
    });
  };

  loadLocationByAddress = (address) => {
    if (address) {
      Geocode.fromAddress(address).then(
        response => {
          const location = response.results.map(item => {
            const ne = item.geometry.viewport.northeast;
            const sw = item.geometry.viewport.southwest;
            const {center, zoom} = fitBounds({sw, ne}, this.state.size);
            this.setState({center: center, zoom: zoom});
            return {
              text: item.formatted_address,
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng
            };
          });
          this.setState({location: location});
        }
      ).catch(function (error) {
        console.log(error);
      });
    }
  };

  loadLocationByGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.loadLocationByCoordinates(position.coords.latitude, position.coords.longitude);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };

  countrySelectHandler = (event) => {
    if (typeof event.target.value !== 'undefined') {
      this.setState({search: {country: event.target.value}});
      this.loadLocationByAddress(event.target.value);
    }
  };

  citySearchHandler = (event) => {
    if (typeof event.target.value !== 'undefined') {
      this.setState({search: {city: event.target.value}});
    }
  };

  searchButtonHandler = () => {
    this.loadLocationByAddress(this.state.search.city + ' ' + this.state.search.country);
  };

  saveLocation = (location) => {
    // @TODO: check if already exist
    this.setState({savedWeatherStations: [...this.state.savedWeatherStations, location]});
    localStorage.setItem('weatherlocations', JSON.stringify([...this.state.savedWeatherStations, location]));
  };

  navigationToggleHandler = () => {
    this.setState((prevState) => {
      return {showNavigation: !prevState.showNavigation};
    });
  };

  _onMapChangeHandler = ({size, zoom, bounds}) => {
    this.loadWeatherStations(bounds);
    this.setState({size, zoom});
  };

  render() {
    const weatherStationsList = this.state.weatherStations.map(item => {
      return <ListItem key={item.id} title={item.name}>
        <p>
          Temperature: {item.main.temp}<br/>
          Pressure: {item.main.pressure}<br/>
          Humidity: {item.main.humidity}
        </p>
        <Button type={'green'} clicked={() => this.saveLocation(item)}>Save</Button>
        <Button clicked={() => this.loadLocationByCoordinates(item.coord.Lat, item.coord.Lon)}>Show on map</Button>
      </ListItem>
    });

    const savedWeatherStationsList = this.state.savedWeatherStations.map(item => {
      return <ListItem key={item.id} title={item.name}>
        <p>
          Temperature: {item.main.temp}<br/>
          Pressure: {item.main.pressure}<br/>
          Humidity: {item.main.humidity}
        </p>
        <Button clicked={() => this.loadLocationByCoordinates(item.coord.Lat, item.coord.Lon)}>Show on map</Button>
      </ListItem>
    });

    let navigationClass = 'navigation close';
    if (this.state.showNavigation) {
      navigationClass = 'navigation open';
    }

    return (
      <>
        <div className="row">
          <NavigationToggle active={this.state.showNavigation} clicked={this.navigationToggleHandler}/>
          <div className={navigationClass}>
            <h1>Weather app</h1>
            <div className="navigation__wrap">
              <Accordion title="Search location">
                <div className="input">
                  <select defaultValue="" onChange={this.countrySelectHandler}>
                    <option value="" disabled>Choose country</option>
                    <option value="">All</option>
                    {this.state.countries.map(country =>
                      <option key={country} value={country}>{country}</option>
                    )}
                  </select>
                </div>
                <div className="input">
                  <input placeholder="Enter city" type="text" onChange={this.citySearchHandler}/>
                </div>
                <Button clicked={this.searchButtonHandler}>Search</Button>
                <Button type={'orange'} clicked={this.loadLocationByGeolocation}>Load browser location</Button>
              </Accordion>
              <Accordion title="Cities on map">
                {weatherStationsList}
              </Accordion>
              <Accordion title="Saved cities">
                {savedWeatherStationsList}
              </Accordion>
            </div>
          </div>
          <div className="main">
            <GoogleMap
              change={this._onMapChangeHandler} v
              markers={this.state.weatherStations}
              center={this.state.center}
              zoom={this.state.zoom}/>
          </div>
        </div>
      </>
    );
  }
}

export default WeatherApp;
