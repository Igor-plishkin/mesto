export class Api {
  constructor(token, groupId) {
    this.token = token;
    this.groupId = groupId;
    this.url = "https://mesto.nomoreparties.co/v1/";
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this.url + this.groupId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    }).then(this._handleResponse);
  }

  setUser(data) {
    return fetch(`${this.url + this.groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  setAvatar(data) {
    return fetch(`${this.url + this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }

  setCard(data) {
    return fetch(`${this.url + this.groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url + this.groupId}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then(this._handleResponse);
  }

  putLikeToCard(id) {
    return fetch(`${this.url + this.groupId}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    }).then(this._handleResponse);
  }

  deleteLikeCard(id) {
    return fetch(`${this.url + this.groupId}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then(this._handleResponse);
  }
  
  getInitialCards() {
    return fetch(`${this.url + this.groupId}/cards`, {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    }).then(this._handleResponse);
  }
}
