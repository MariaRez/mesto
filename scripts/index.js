import initialCards from "./cards.js";

const keyEscape = "Escape";
const popupProfileButtonEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_place_profile");
const formProfile = document.querySelector(".form_place_profile");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNewName = document.querySelector(".popup__field_type_name");
const profileNewDescription = document.querySelector(
  ".popup__field_type_description"
);
const popupCard = document.querySelector(".popup_place_card");
const popupCardButtonAdd = document.querySelector(".profile__add-button");

const openModalWindow = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc); // добавляем слушатель при открытом попапе - при нажатии закрываем попап
};

const closeModalWindow = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc); // убираем слушатель
};

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
  buttonElement.removeAttribute("disabled");
});

formProfile.addEventListener("submit", submitHandlerFormProfile);
popupCardButtonAdd.addEventListener("click", () => openModalWindow(popupCard));

/* вторая часть функционала */

const initialCardsTemplate =
  document.querySelector(".elements-template").content;
const elements = document.querySelector(".elements");
const formInputName = document.querySelector(".popup__field_type_placename");
const formInputLink = document.querySelector(".popup__field_type_placelink");

/*описываем функции для карточек из заданого массива*/
/*функция добавления массива*/
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
  buttonElement.setAttribute("disabled", true);
  const inputObject = { name: formInputName.value, link: formInputLink.value };
  createCard(inputObject);
  prependToContainer(elements, createCard(inputObject));
  formInputName.value = "";
  formInputLink.value = "";
}

const formCard = document.querySelector(".form_place_card");
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

/*попап с картинкой*/
const popupImage = document.querySelector(".popup_place_image");
const popupImageButtonOpen = document.querySelectorAll(".element__image");
const popupImageActiveImage = document.querySelector(".popup__image");
const popupImageActiveTitle = document.querySelector(".popup__text");

function openPopupImage(evt) {
  openModalWindow(popupImage);
  popupImageActiveImage.src = evt.target.src;
  popupImageActiveImage.alt = evt.target.alt;
  popupImageActiveTitle.textContent = evt.target.alt;
}

[popupProfile, popupCard, popupImage].forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (evt) {
    if ((evt.target === evt.currentTarget)|| evt.target.classList.contains('popup__close-button')) {
      closeModalWindow(popupElement);
    }
  });
});

//закрытие попапов при нажатии на esc
function closeOnEsc(evt) {
  if (evt.key === keyEscape) {
    const activePopup = document.querySelector(".popup_opened");
    closeModalWindow(activePopup);
  }
}