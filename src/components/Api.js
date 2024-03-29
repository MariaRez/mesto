export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _сheckServerResponseStatus(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }    
    
    getUserInfo() { //Загрузка информации о пользователе с сервера (имя, описание и аватар)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._сheckServerResponseStatus);
    }

    getInitialCards() { //Загрузка карточек с сервера
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._сheckServerResponseStatus);
    } 

    editProfile (data) { //Редактирование профиля - имя и описание
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then(this._сheckServerResponseStatus);
    }

    addNewCard(data) { //Добавление новой карточки
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(this._сheckServerResponseStatus);
    }

    deleteCard(_id) { // Удаление карточки
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._сheckServerResponseStatus);
    }

    makeLike(_id) { //Поставить лайк
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._сheckServerResponseStatus);
    }

    deleteLike(_id) {//Убрать лайк
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._сheckServerResponseStatus);
    }

    editAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
        .then(this._сheckServerResponseStatus);
    }
}