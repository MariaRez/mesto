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

export const popupProfileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const popupCardButtonAdd = document.querySelector(
  ".profile__add-button"
);

export const formProfile = document.querySelector(".form_place_profile");
export const formCard = document.querySelector(".form_place_card");

export const profileNewName = document.querySelector(".popup__field_type_name");
export const profileNewDescription = document.querySelector(
  ".popup__field_type_description"
);