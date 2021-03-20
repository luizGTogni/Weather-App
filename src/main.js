import Weather from './Weather';
import GeolocationApi from './GeolocationApi';
import SessionApi from './SessionApi';

const weather = new Weather();
const geolocationApi = new GeolocationApi();
const sessionApi = new SessionApi();

const inputCityElement = document.getElementById('city');
const buttonSearchElement = document.getElementById('button-search');

document.querySelector('body').onload = () => {
  const city = sessionApi.getData();

  if (!!city) {
    weather.searchCity(city);
    return;
  }

  const { latitude, longitude } = geolocationApi.getLocation();

  if (latitude.length && longitude.length) {
    weather.searchCoords(latitude, longitude);
  }
};

inputCityElement.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const value = inputCityElement.value;
    weather.searchCity(value);
  }
});

buttonSearchElement.addEventListener('click', () => {
  const value = inputCityElement.value;
  weather.searchCity(value);
});

