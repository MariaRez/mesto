export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationSettings = {
  formElement: ".form",
  inputElement: ".popup__field",
  buttonElement: ".popup__button",
  buttonElementDisabled: "popup__button_disabled",
  inputErrorClass: ".popup__field_type_error",
  errorElementActive: "error_active",
};

const keyEscape = "Escape";

export const popupProfileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const popupProfile = document.querySelector(".popup_place_profile");
export const formProfile = document.querySelector(".form_place_profile");
export const formCard = document.querySelector(".form_place_card");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNewName = document.querySelector(".popup__field_type_name");
export const profileNewDescription = document.querySelector(
  ".popup__field_type_description"
);
export const popupCard = document.querySelector(".popup_place_card");
export const popupCardButtonAdd = document.querySelector(
  ".profile__add-button"
);

function closeOnEsc(evt) {
  if (evt.key === keyEscape) {
    const activePopup = document.querySelector(".popup_opened");
    closeModalWindow(activePopup);
  }
}

export const openModalWindow = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
};

export const closeModalWindow = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
};

export const popupImage = document.querySelector(".popup_place_image");