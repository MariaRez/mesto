export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const keyEscape = "Escape";

function closeOnEsc(evt) {
  if (evt.key === keyEscape) {
    const activePopup = document.querySelector(".popup_opened");
    closeModalWindow(activePopup);
  }
}

export const openModalWindow = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc); // добавляем слушатель при открытом попапе - при нажатии закрываем попап
};

export const closeModalWindow = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc); // убираем слушатель
};

export const popupImage = document.querySelector(".popup_place_image");
const popupImageActiveImage = document.querySelector(".popup__image");
const popupImageActiveTitle = document.querySelector(".popup__text");

export function openPopupImage(evt) {
  openModalWindow(popupImage);
  popupImageActiveImage.src = evt.target.src;
  popupImageActiveImage.alt = evt.target.alt;
  popupImageActiveTitle.textContent = evt.target.alt;
}