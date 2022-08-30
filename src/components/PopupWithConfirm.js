import { Popup } from "../components/Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(selector) {
        super(selector);
        this._form = this._popup.querySelector(".form");
      }

      delete(handleSubmit) {
        this._handleSubmit = handleSubmit;
      }

      setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}