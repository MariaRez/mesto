import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
    constructor( selector, handleSubmit ) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll(".popup__field")); //все инпуты в данном попапе
        this._form = this._popup.querySelector(".form");
    }

    _getInputValues () { //собирает данные всех полей ввода в формах
        this._formValues = {}; //собирает сюда
        this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
        return this._formValues;
    }

    close() {
        this._form.reset(); // сбросит данные 
        super.close(); //сделает закрытие как у родителя
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
          });
    }
}
