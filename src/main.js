import Weather from './Weather';

const weather = new Weather();

const inputCityElement = document.getElementById('city');
const buttonSearchElement = document.getElementById('button-search');

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

