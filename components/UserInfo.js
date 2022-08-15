export class UserInfo {
    constructor (profileName, profileDescription){ //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo(){ //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    }

    setUserInfo(){ //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

    }
}