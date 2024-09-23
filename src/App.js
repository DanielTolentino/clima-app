import React, { useState } from 'react';
import './App.css';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const getBackgroundClass = () => {
    if (weather.main && weather.main.temp > 15) {
      return 'app warm';
    }
    return 'app cold';
  }

  const getWeatherIcon = () => {
    if (weather.weather && weather.weather[0]) {
      return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    }
    return '';
  }

  return (
    <div className={getBackgroundClass()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Pesquisar..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].description}</div>
            <img src={getWeatherIcon()} alt="Weather icon" className="weather-icon" />
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;