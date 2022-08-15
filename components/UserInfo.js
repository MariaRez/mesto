export class UserInfo {
    constructor (profileName, profileDescription){ //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo(){ //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    // возвращает объект с данными пользователя
    const userData = {
        name: this._profileName.textContent,
        description: this._profileDescription.textContent,
    };
      return userData;
    }

    setUserInfo(profile){ //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
            // принимает новые данные пользователя и добавляет их на страницу
            this._profileName.textContent = profile.profileName;
            this._profileDescription.textContent = profile.profileDescription;
    }
}