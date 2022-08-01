export class FormValidator{
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(this._settings.inputElement));
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorElementActive);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._settings.errorElementActive);
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
          } else {
            this._hideInputError(inputElement,);
          }
    }

    _buttonDisabled() { //если будет возможность доработай и сделай публичным - заменить на него в двуз местах index.js
        this._buttonElement = this._form.querySelector(this._settings.buttonElement);
        this._buttonElement.classList.add(this._settings.buttonElementDisabled);
        this._buttonElement.setAttribute("disabled", true);
    }

    _buttonEnabled() {
        this._buttonElement.classList.remove(this._settings.buttonElementDisabled);
        this._buttonElement.removeAttribute("disabled", true);
    }

    _toggleButtonState() {
        if(this._hasInvalidInput()){
            this._buttonDisabled(this._buttonElement);
        } else {
            this._buttonEnabled(this._buttonElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    }

    _setEventListeners(){
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", function (evt) {
          evt.preventDefault();
        });
        this._setEventListeners();
    }
}