export class UserInfo {
    constructor ({profileName, profileDescription}){ //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
        this._name = document.querySelector(profileName);
        this._description = document.querySelector(profileDescription);
    }

    getUserInfo(){ //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    // возвращает объект с данными пользователя
    const userData = {
        elementName: this._name.textContent,
        elementDescription: this._description.textContent,
    };
      return userData;
    }

    setUserInfo(profile){ //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
            // принимает новые данные пользователя и добавляет их на страницу
            this._name.textContent = profile.name;
            this._description.textContent = profile.description;
    }
}