class GeolocationApi {
  _location;

  set location(coords) {
    this._location = coords;
  }

  get location() {
    return this._location;
  }

  constructor() {
    this.location = {
      latitude: '-23.567',
      longitude: '-46.57'
    };
  }

  getLocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      return this.location;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.cords;
    
        this.location = {
          latitude,
          longitude,
        }
      }, 
      (err) =>{
        switch(err.code) {
          case err.PERMISSION_DENIED:
            console.warn('User denied the request for Geolocation.');
            break;
          case err.POSITION_UNAVAILABLE:
            console.warn("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            console.warn("The request to get user location timed out.");
            break;
          case err.UNKNOWN_ERROR:
            console.warn("An unknown error occurred.");
            break;
        }
      });

    return this.location;
  }
}

export default GeolocationApi;