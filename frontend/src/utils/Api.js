class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  /** приватный метод для проверки, все ли в порядке с ответом от сервера */
  _handleResponseValidation(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  /** публичный метод для подгрузки информации о пользователе с сервера */
  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для обновления информации о пользователе на сервере */
  updateUserInfo(data, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для обновления аватара пользователя на сервере */
  updateUserAvatar(data, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для подгрузки начального массива карточек с сервера */
  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для добавления новых карточек на сервер */
  addCard(data, token) {
    return fetch(this._baseUrl + '/cards', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для удаления карточки с сервера */
  deleteCard(id, token) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

  /** публичный метод для смены статуса лайка карточки */
  changeLikeCardStatus(id, isLiked, token) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

}

const api = new Api({
  baseUrl: "https://api.verele.nomoredomainsicu.ru",
});

export default api;
