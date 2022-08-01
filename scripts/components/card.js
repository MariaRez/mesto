import {openModalWindow} from "../utils.js";

export class Card {
    constructor(data,selector){
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    }

    createCard(){//функция создания карточки
        this._element = this._getElement();
        this._image = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector(".element__like");
        this._deleteButton = this._element.querySelector(".element__trash");

        return this._element;
    }

    _getElement(){ //разметка - получение шаблона необходимого для создания карточки
        const htmlElement = document
         .querySelector(this._selector)
         .content
         .querySelector("element")
         .cloneNode(true);

         return htmlElement;
    }

    _setEventListeners(){ //устанавливает слушатели
        this._deleteButton.addEventListener('click', () => {
			this._deleteHandler();
		});
        this._likeButton.addEventListener('click', () => {
			this._likeHandler();
		});
        this._image.addEventListener('click', () => {
			this._openPopupImageHandler();
		});
	}

    _deleteHandler(){ //функция удаления элемента
        this._element.remove();
    }

    _likeHandler(){
        this._likeButton.classList.toggle("element__like_active");
    }

    _openPopupImageHandler(){ //исправить функцию которая в константе и перенести сюда
        openModalWindow(popupImage);
        popupImageActiveImage.src = this._link;
        popupImageActiveImage.alt = this._link;
        popupImageActiveTitle.textContent = this._name;
    }
}