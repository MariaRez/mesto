export class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
      //Принимает в конструктор объект с селекторами трех элементов: элемента имени пользователя, элемента информации о себе и элемент аватара.
      this._profileName = document.querySelector(profileName);
      this._profileDescription = document.querySelector(profileDescription);
      this._profileAvatar = document.querySelector(profileAvatar);
    }
    getUserInfo() {
      const userData = {
        name: this._profileName.textContent,
        description: this._profileDescription.textContent,
        avatar: this._profileAvatar.src,
      };
      return userData;
    }
  
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileDescription.textContent = data.about;
      this._profileAvatar.src = data.avatar;
    }
}  