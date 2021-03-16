class Api {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(params) {
    const url = `${this.baseUrl}${params}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return response.json();
  }
}

export default Api;