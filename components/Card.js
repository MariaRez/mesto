export class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteHandler() {
    this._element.remove();
  }

  _likeHandler() {
    this._likeButton.classList.toggle("element__like_active");
  }
}