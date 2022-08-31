export class Card {
  constructor(data, selector, handleCardClick, {userId, handleCardDelete, handleMakeLike, handleDeleteLike}) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._id = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._handleCardDelete = handleCardDelete;
    this._handleMakeLike = handleMakeLike;
    this._handleDeleteLike = handleDeleteLike;
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
    this._likeCounter = this._element.querySelector(".element__like-counter");
    
    this.likeCounter(this._likes);
    this.makeActiveLike();
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
      this._handleCardDelete(this);
    });

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like_active")) {
        this._handleDeleteLike();
      } else {
        this._handleMakeLike();
      }
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  deleteCardHandler() {
    this._element.remove();
    this._element = null;
  }

  makeLikeHandler() {
    this._likeButton.classList.add("element__like_active");
  }

  deleteLikeHandler() {
    this._likeButton.classList.remove("element__like_active");
  }

  likeCounter(likes) {
    if (likes.length === 0) {
      this._likeCounter.textContent = '0';
    } else {
      this._likeCounter.textContent = likes.length;
    }
  }

  _makeActiveLike() {
    this._likes.forEach((like) => {
      if (this._id === like._id) {
        this._likeButton.classList.add("element__like_active");
      }
    });
  }
}