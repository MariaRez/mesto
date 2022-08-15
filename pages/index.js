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
  popupImageActiveTitle,
  popupImageActiveImage
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";

function handleCardClick(name, link) { //исправить
  openModalWindow(popupImage);
  popupImageActiveImage.src = link;
  popupImageActiveImage.alt = name;
  popupImageActiveTitle.textContent = name;
}

const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
const elements = document.querySelector(".elements");
const formInputName = document.querySelector(".popup__field_type_placename");
const formInputLink = document.querySelector(".popup__field_type_placelink");

function submitHandlerFormProfile() { //исправть
  profileName.textContent = profileNewName.value;
  profileDescription.textContent = profileNewDescription.value;
  closeModalWindow(popupProfile);
}

popupProfileButtonEdit.addEventListener("click", () => { //исправить
  openModalWindow(popupProfile);
  profileValidation.resetValidation();
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
});

formProfile.addEventListener("submit", submitHandlerFormProfile);

popupCardButtonAdd.addEventListener("click", () => {
  openModalWindow(popupCard);
  cardValidation.resetValidation();
});

function submitHandlerFormPlace(evt) {
  evt.preventDefault();
  const element = {
    name: formInputName.value,
    link: formInputLink.value,
  };
  elements.prepend(createCard(element, ".elements-template"));
  closeModalWindow(popupCard);
  evt.target.reset();
}

function createCard(element, selector) {
  const card = new Card(element, selector, handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

initialCards.reverse();
initialCards.forEach((element) => {
  elements.prepend(createCard(element, ".elements-template"));
});

formCard.addEventListener("submit", submitHandlerFormPlace);

[popupProfile, popupCard, popupImage].forEach((popupElement) => { //убрать
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