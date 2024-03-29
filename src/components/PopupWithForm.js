import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, {handleSubmit}) {
    //кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super(selector);
    this._handleSubmit = handleSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__field")); //все инпуты в данном попапе
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector(".popup__button");
    this._buttonText = this._button.textContent; //первоначальный текст карточки "Сохранить/Создать"
  }

  _getInputValues() {
    //приватный метод _getInputValues, который собирает данные всех полей формы
    const formValues = {}; //собирает сюда
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  close() {
    //перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset(); // сбросит данные
    super.close(); //сделает закрытие как у родителя
  }

  setEventListeners() {
    //перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
  
  renderLoading (isLoading){
    if (isLoading){
      this._button.textContent = "Сохранение..." //пока грузиться
    } else {
      this._button.textContent = this._buttonText; //оригинальный текст
    }
  };
}