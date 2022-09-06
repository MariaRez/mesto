export class UserInfo {
    constructor({ profileName, profileAbout, profileAvatar }) {
      //Принимает в конструктор объект с селекторами трех элементов: элемента имени пользователя, элемента информации о себе и элемент аватара.
      this._name = document.querySelector(profileName);
      this._about = document.querySelector(profileAbout);
      this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
      const userData = {
        elementName: this._name.textContent,
        elementAbout: this._about.textContent,
        elementAvatar: this._avatar.src,
      };
      return userData;
    }
  
    setUserInfo(profile) {
      if (profile.name) {
        this._name.textContent = profile.name;
      }
      if (profile.about) {
        this._about.textContent = profile.about;
      }
      if (profile.avatar) {
        this._avatar.src = profile.avatar   
      }
    }
}  