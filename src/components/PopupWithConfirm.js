import { Popup } from "../components/Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(selector, {handleSubmit}) {
        super(selector);
        this._form = this._popup.querySelector(".form");
        this._handleSubmit = handleSubmit;
      }

      setSubmitDelete({ handleSubmitDelete }) {
        this._handleSubmit = handleSubmitDelete;
      }

      setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}