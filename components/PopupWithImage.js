import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector); //берем от родителя
    this._text = this._popup.querySelector(".popup__text");
    this._image = this._popup.querySelector(".popup__image");
  }

  open({ name, link }) { //корректируем родительский метод открытия для попапа с картинкой - у него есть специфическая функциональность
    super.open(); //берем от родителя
    this._image.src = link;
    this._text.alt = name;
    this._text.textContent = name;
  }
}