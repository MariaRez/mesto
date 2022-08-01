import {initialCards, validationSettings, popupProfileButtonEdit, popupProfile, formProfile, formCard, profileName, profileDescription, profileNewName, profileNewDescription, popupCard, popupCardButtonAdd, openModalWindow, closeModalWindow, popupImage, openPopupImage} from "./utils/utils.js"
import {FormValidator} from "./components/validate.js";

const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);

function submitHandlerFormProfile() {
  profileName.textContent = profileNewName.value;
  profileDescription.textContent = profileNewDescription.value;
  closeModalWindow(popupProfile);
}

popupProfileButtonEdit.addEventListener("click", () => {
  openModalWindow(popupProfile);
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
  const buttonElement = popupProfile.querySelector(".popup__button");
  buttonElement.classList.remove("popup__button_disabled");
  buttonElement.removeAttribute("disabled"); //три строки заменить на публичный метод из валидации
});

formProfile.addEventListener("submit", submitHandlerFormProfile);
popupCardButtonAdd.addEventListener("click", () => openModalWindow(popupCard));

const initialCardsTemplate = document.querySelector(".elements-template").content;
const elements = document.querySelector(".elements");
const formInputName = document.querySelector(".popup__field_type_placename");
const formInputLink = document.querySelector(".popup__field_type_placelink");

const prependToContainer = (container, element) => {
  container.prepend(element);
};

function createCard(element) {
  const htmlElement = initialCardsTemplate.cloneNode(true);
  htmlElement.querySelector(".element__text").textContent = element.name;
  const image = htmlElement.querySelector(".element__image");
  image.src = element.link;
  image.alt = element.name;
  setElementEventListeners(htmlElement);
  return htmlElement;
}
const reverseInitialCards = initialCards.reverse();

reverseInitialCards.forEach((element) => {
  prependToContainer(elements, createCard(element));
});

/*функция для добавления новой карточки*/

function submitHandlerFormPlace() {
  closeModalWindow(popupCard);
  const buttonElement = popupCard.querySelector(".popup__button");
  buttonElement.classList.add("popup__button_disabled");
  buttonElement.setAttribute("disabled", true); //три строки заменить на публичный метод из валидации
  const inputObject = { name: formInputName.value, link: formInputLink.value };
  createCard(inputObject);
  prependToContainer(elements, createCard(inputObject));
  formInputName.value = "";
  formInputLink.value = "";
}
formCard.addEventListener("submit", submitHandlerFormPlace);

/* функции удаления,лайка и открытия попапа карточки */
function deleteHandler(evt) {
  evt.target.closest(".element").remove();
}

function likeHandler(evt) {
  evt.target.classList.toggle("element__like_active");
}

function setElementEventListeners(htmlElement) {
  const buttonDelete = htmlElement.querySelector(".element__trash");
  buttonDelete.addEventListener("click", deleteHandler);

  const buttonLike = htmlElement.querySelector(".element__like");
  buttonLike.addEventListener("click", likeHandler);

  const popupOpenImage = htmlElement.querySelector(".element__image");
  popupOpenImage.addEventListener("click", openPopupImage);
}

[popupProfile, popupCard, popupImage].forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (evt) {
    if ((evt.target === evt.currentTarget)|| evt.target.classList.contains('popup__close-button')) {
      closeModalWindow(popupElement);
    }
  });
});

profileValidation.enableValidation();
cardValidation.enableValidation();