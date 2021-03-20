class SessionApi {
  save(city) {
    localStorage.setItem('@weatherCity', city);
  }

  getData() {
    return localStorage.getItem('@weatherCity');
  }
}

export default SessionApi;