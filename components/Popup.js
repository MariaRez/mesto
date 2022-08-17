export class Popup {
    constructor(selector) {
      //Принимает в конструктор единственный параметр — селектор попапа.
      this._popup = document.querySelector(selector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      // публичный метод открытия
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      // публичный метод закрытия
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      //приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc
      const keyEscape = "Escape";
      if (evt.key === keyEscape) {
        this.close();
      }
    }
  
    setEventListeners() {
      //публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа и при нажатии на overlay
      this._popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.close();
        }
        if (evt.target.classList.contains("popup__close-button")) {
          this.close();
        }
      });
    }
  }