class HttpRequest {
  constructor() {
    this.baseUrl = "https://spotify.f8team.dev/api/";
  }

  async _send(path, method, data, options = {}) {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      method,
      headers: {
        ...options.headers,
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
    const response = await res.json();
    if (!res.ok) throw response;

    return response;
  }

  async get(path, options) {
    return await this._send(path, "GET", null, options);
  }

  async post(path, data, options) {
    return await this._send(path, "POST", data, options);
  }

  async put(path, data, options) {
    return await this._send(path, "PUT", data, options);
  }

  async patch(path, data, options) {
    return await this._send(path, "PATCH", data, options);
  }

  async del(path, options) {
    return await this._send(path, "DELETE", null, options);
  }
}

export default new HttpRequest();
