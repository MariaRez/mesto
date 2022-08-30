export class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
      //Принимает в конструктор объект с селекторами трех элементов: элемента имени пользователя, элемента информации о себе и элемент аватара.
      this._name = document.querySelector(profileName);
      this._description = document.querySelector(profileDescription);
      this._avatar = document.querySelector(profileAvatar);
    }
  
    getUserInfo() {
      //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
      // возвращает объект с данными пользователя
      const userData = {
        elementName: this._name.textContent,
        elementDescription: this._description.textContent,
        elementAvatar: this._avatar.src,
        _id: this._id
      };
      return userData;
    }
  
    setUserInfo(profile) {
      //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
      // принимает новые данные пользователя и добавляет их на страницу
      this._name.textContent = profile.name;
      this._description.textContent = profile.description;
      this._id = profile._id;
    }

    setUserAvatar(profile){
      this._avatar.src = profile.avatar;
    }
}  