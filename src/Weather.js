import Api from './Api';
import SessionApi from './SessionApi';

import { API_KEY } from '@env';

const accuWeatherApi = new Api('https://dataservice.accuweather.com');
const sessionApi = new SessionApi();

const locationElement = document.getElementById('location');
const weatherIconElement = document.getElementById('weather_icon');
const weatherTextElement = document.getElementById('weather_text');
const weatherTemperatureElement = document.getElementById('weather_temperature');

class Weather {
  data;

  constructor() {
    this.data = {
      key: '',
      country: '',
      city: '',
      epochTime: 0,
      weatherText: '',
      weatherIcon: null,
      isDayTime: false,
      temperatureCelsius: 0,
      temperatureFahrenheit: 0,
    };
  }

  searchCoords(lat, long) {
    accuWeatherApi.get(`/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C%20${long}`)
      .then(response => {
        this.data.key = response.Key;
        this.data.country = response.Country.LocalizedName;
        this.data.city = response.LocalizedName;

        this.getCurrentCondition();
      })
      .catch(error => console.log('error search:', error));
  }

  searchCity(name) {
    accuWeatherApi.get(`/locations/v1/cities/search?apikey=${API_KEY}&q=${name}`)
      .then(response => {
        this.data.key = response[0].Key;
        this.data.country = response[0].Country.LocalizedName;
        this.data.city = response[0].LocalizedName;

        this.getCurrentCondition();
      })
      .catch(error => console.log('error search:', error));
  }

  getCurrentCondition() {
    const keyCode = this.data.key;
    accuWeatherApi.get(`/currentconditions/v1/${keyCode}?apikey=${API_KEY}`)
    .then(response => {
      this.data.epochTime = response[0].EpochTime;
      this.data.weatherText = response[0].WeatherText;
      this.data.weatherIcon = response[0].WeatherIcon;
      this.data.isDayTime = response[0].IsDayTime;
      this.data.temperatureCelsius = response[0].Temperature.Metric.Value;
      this.data.temperatureFahrenheit = response[0].Temperature.Imperial.Value;
      
      sessionApi.save(this.data.city);
      this.renderInfo();
    })
    .catch(error => console.log('error condition:', error));
  }

  getWeatherIcon(codeIcon) {
    let icon = 1;

    if (codeIcon >= 3 && codeIcon <= 4 || codeIcon === 6) {
      icon = 3;
    } else if (codeIcon === 5 ) {
      icon = 5;
    } else if (codeIcon >= 7  && codeIcon <= 8 || codeIcon === 11) {
      icon = 7;
    } else if (codeIcon === 12 || codeIcon === 18 || codeIcon === 29) {
      icon = 12;
    } else if (codeIcon >= 13  && codeIcon <= 14) {
      icon = 13;
    } else if (codeIcon === 15) {
      icon = 15;
    } else if (codeIcon >= 16 && codeIcon <= 17) {
      icon = 16;
    } else if (
      codeIcon === 19 || 
      (codeIcon >= 20 && codeIcon <= 23) || 
      (codeIcon >= 43 && codeIcon <= 44)
    ) {
      icon = 19;
    } else if (codeIcon === 24) {
      icon = 24;
    } else if (codeIcon >= 25 && codeIcon <= 26) {
      icon = 25;
    } else if (codeIcon === 30) {
      icon = 30;
    } else if (codeIcon === 31) {
      icon = 31;
    } else if (codeIcon === 32) {
      icon = 32;
    } else if (codeIcon >= 33 && codeIcon <= 34) {
      icon = 33;
    } else if (codeIcon >= 35 && codeIcon <= 38) {
      icon = 35;
    } else if (codeIcon >= 39 && codeIcon <= 40) {
      icon = 39;
    } else if (codeIcon >= 41 && codeIcon <= 42) {
      icon = 41;
    } 
    
    return icon;
  }

  createLocation(data) {
    locationElement.innerHTML = `${data.city}, <span>${data.country}</span>`
  }

  createWeatherInfo(data) {
    const iconSelected = this.getWeatherIcon(data.weatherIcon); 

    weatherIconElement.src = `./assets/img/icons/0${iconSelected}.svg`
    weatherIconElement.setAttribute('alt', data.weatherText);
    weatherTextElement.textContent = data.weatherText;
    weatherTemperatureElement.textContent = data.temperatureCelsius;
  }

  renderInfo(data = this.data) {
    this.createLocation(data);
    this.createWeatherInfo(data);
  }
}

export default Weather;