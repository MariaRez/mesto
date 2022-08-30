import { Popup } from "../components/Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".form");
      }
}