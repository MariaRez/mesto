import {
  initialCards,
  validationSettings,
  popupProfileButtonEdit,
  popupProfile,
  formProfile,
  formCard,
  profileName,
  profileDescription,
  profileNewName,
  profileNewDescription,
  popupCard,
  popupCardButtonAdd,
  openModalWindow,
  closeModalWindow,
  popupImage,
  cleanPopup,
} from "./utils/utils.js";
import { FormValidator } from "./components/validate.js";
import { Card } from "./components/card.js";

const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
const elements = document.querySelector(".elements");
const formInputName = document.querySelector(".popup__field_type_placename");
const formInputLink = document.querySelector(".popup__field_type_placelink");

function submitHandlerFormProfile() {
  profileName.textContent = profileNewName.value;
  profileDescription.textContent = profileNewDescription.value;
  closeModalWindow(popupProfile);
}

popupProfileButtonEdit.addEventListener("click", () => {
  openModalWindow(popupProfile);
  cleanPopup(popupProfile);
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
  const buttonElement = popupProfile.querySelector(".popup__button");
  buttonElement.classList.remove("popup__button_disabled");
  buttonElement.removeAttribute("disabled");
});

formProfile.addEventListener("submit", submitHandlerFormProfile);

popupCardButtonAdd.addEventListener("click", () => {
  openModalWindow(popupCard);
  cleanPopup(popupCard);
  const buttonElement = popupCard.querySelector(".popup__button");
  buttonElement.classList.add("popup__button_disabled");
  buttonElement.setAttribute("disabled", true);
  formInputName.value = "";
  formInputLink.value = "";
});

const prependToContainer = (element) => {
  elements.prepend(element);
};

function submitHandlerFormPlace(evt) {
  evt.preventDefault();
  const element = {
    name: formInputName.value,
    link: formInputLink.value,
  };
  createCard(element, ".elements-template");
  closeModalWindow(popupCard);
}

function createCard(element, selector) {
  const card = new Card(element, selector);
  const cardElement = card.createCard();
  prependToContainer(cardElement);
}

initialCards.reverse();
initialCards.forEach((element) => {
  createCard(element, ".elements-template");
});

formCard.addEventListener("submit", submitHandlerFormPlace);

[popupProfile, popupCard, popupImage].forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closeModalWindow(popupElement);
    }
  });
});

profileValidation.enableValidation();
cardValidation.enableValidation();