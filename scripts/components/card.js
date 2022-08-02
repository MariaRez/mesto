import { openModalWindow } from "../utils/utils.js";

export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  createCard() {
    //функция создания карточки
    this._element = this._getElement();
    this._element.querySelector(".element__text").textContent = this._name;
    this._image = this._element.querySelector(".element__image");
    this._image.alt = this._name;
    this._image.src = this._link;
    this._deleteButton = this._element.querySelector(".element__trash");
    this._likeButton = this._element.querySelector(".element__like");
    this._setEventListeners();

    return this._element;
  }

  _getElement() {
    //разметка - получение шаблона необходимого для создания карточки
    const htmlElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return htmlElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._deleteHandler();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeHandler();
    });

    this._image.addEventListener("click", () => {
      this._openPopupImageHandler();
    });
  }

  _deleteHandler() {
    this._element.remove();
  }

  _likeHandler() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _openPopupImageHandler() {
    this._popupImage = document.querySelector(".popup_place_image");
    this._popupImageActiveImage =
      this._popupImage.querySelector(".popup__image");
    this._popupImageActiveTitle =
      this._popupImage.querySelector(".popup__text");

    openModalWindow(this._popupImage);
    this._popupImageActiveImage.src = this._link;
    this._popupImageActiveImage.alt = this._link;
    this._popupImageActiveTitle.textContent = this._name;
  }
}