class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._BASE_URL = 'https://auth.nomoreparties.co';
  };

  #getResponseInJson(res) {
    if (res.ok) {
      return res.json()
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this.#getResponseInJson)
  };

  getAllInfo() {
    return Promise.all([this._getUserData(), this._getCards()])
  };

  _getUserData(token) {
    return this._request(`${this._url}/users/me`, {
      headers: { ...this._headers }
    })
  };

  gatUserData(data) {
    return this._request(`${this._url}/users/me`, {
      headers: { ...this._headers },
      method: 'PATCH',
      body: JSON.stringify({
        name: data?.name,
        about: data?.about
      })
    })
  };

  getAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      headers: { ...this._headers },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  };

  _getCards() {
    return this._request(`${this._url}/cards`, {
      headers: { ...this._headers }
    })
  };

  getNewCard(data) {
    return this._request(`${this._url}/cards`, {
      headers: { ...this._headers },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.about
      })
    })
  };

  deleteCard(idCard) {
    return this._request(`${this._url}/cards/${idCard}`, {
      headers: { ...this._headers },
      method: 'DELETE'
    })
  };

  stagingLike(idCard, isLiked) {
    return this._request(`${this._url}/cards/${idCard}/likes`, {
      headers: { ...this._headers },
      method: isLiked ? 'DELETE' : 'PUT'
    })
  };

  register(email, password) {
    return this._request(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
  };

  authorize(email, password) {
    return this._request(`${this._BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
  };

  checkToken(token) {
    return this._request(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
  };
};

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "5d440b53-15e9-4795-b96c-006fd15680f1",
    "Content-Type": "application/json",
  },
};
const api = new Api(config);

export default api;