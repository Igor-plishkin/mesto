export class Api {
  constructor(token, groupId) {
    this.token = token;
    this.groupId = groupId;
    this.url = 'https://mesto.nomoreparties.co/v1/';
  }

  getUser() {
    return fetch(`${this.url + this.groupId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setUser(data) {
    return fetch(`${this.url + this.groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setAvatar(data) {
    return fetch(`${this.url + this.groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setCard(data) {
    return fetch(`${this.url + this.groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteCard(id) {
    return fetch(`${this.url + this.groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  putLikeToCard(id) {
    return fetch(`${this.url + this.groupId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteLikeCard(id) {
    return fetch(`${this.url + this.groupId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getInitialCards() {
    return fetch(`${this.url + this.groupId}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}
