class Api {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(params) {
    const url = `${this.baseUrl}${params}`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer'
    });

    return response.json();
  }
}

export default Api;