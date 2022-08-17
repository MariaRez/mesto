import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  //перезаписывает родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  constructor(selector) {
    super(selector); //берем от родителя
    this._text = this._popup.querySelector(".popup__text");
    this._image = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    //корректируем родительский метод открытия для попапа с картинкой - у него есть специфическая функциональность
    this._image.src = link;
    this._text.alt = name;
    this._text.textContent = name;
    super.open(); //берем от родителя
  }
}