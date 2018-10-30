import React, {Component} from 'react';
import './assets/sass/main.scss';
import WeatherApp from './containers/WeatherApp/WeatherApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <WeatherApp/>
      </div>
    );
  }
}

export default App;
