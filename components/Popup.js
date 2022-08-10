export class Popup {
    constructor (selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open () {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    
    close () {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

	_handleEscClose (evt) {
        const keyEscape = "Escape";
        if (evt.key === keyEscape) {
            this.close();
        }
    }

    _handleOverlayClose(evt) { // после подключения обязательно проверить корректность
        if (evt.target === evt.currentTarget) {
            this.close();
        }
      }

	setEventListeners () {
        this._popup.addEventListener("mousedown", this._handleOverlayClose); // после подключения обязательно проверить корректность
        this._popup.querySelector(".popup__close-button").addEventListener("click", this.close.bind(this));
    }
}