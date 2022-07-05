const popupProfileButtonEdit = document.querySelector('.profile__edit-button');
const popupProfileButtonClose = document.querySelector('.popup__close-button_place_profile');
const popupProfile = document.querySelector('.popup_place_profile');
const formElement = document.querySelector('.form_place_profile');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('.popup__field_type_name');
const profileNewDescription = document.querySelector('.popup__field_type_description');
const popupCard = document.querySelector('.popup_place_card');
const popupCardButtonAdd = document.querySelector('.profile__add-button');
const popupCardButtonClose = document.querySelector('.popup__close-button_place_card');

const openModalWindow = (popup) => {
  popup.classList.add('popup_opened');
}

const closeModalWindow = (popup) => {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNewName.value;
    profileDescription.textContent = profileNewDescription.value;
    closeModalWindow(popupProfile);
};

popupProfileButtonEdit.addEventListener('click', () => {
  openModalWindow(popupProfile)
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
});
popupProfileButtonClose.addEventListener('click', () => closeModalWindow(popupProfile));
formElement.addEventListener('submit', formSubmitHandler); 
popupCardButtonAdd.addEventListener('click', () => openModalWindow(popupCard));
popupCardButtonClose.addEventListener('click', () => closeModalWindow(popupCard));

/* новый функционал */

const initialCardsTemplate = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
const formButton = document.querySelector('.popup__field-button_place_card');
const formInputName = document.querySelector('.popup__field_type_placename');
const formInputLink = document.querySelector('.popup__field_type_placelink');

/*описываем функции для карточек из заданого массива*/
/*функция добавления массива*/
const prependToContainer = (container, element) => {
  container.prepend(element);
}

function renderInitialCard (element) {
  const htmlElement = initialCardsTemplate.cloneNode(true); 
  htmlElement.querySelector('.element__text').textContent = element.name; 
  const image = htmlElement.querySelector('.element__image');
  image.src = element.link;
  image.alt = element.name;
  setEventElement(htmlElement); 
  prependToContainer(elements,htmlElement);
  return htmlElement;
};
const reverseInitialCards = initialCards.reverse();

const renderInitialCards = () => {
  reverseInitialCards.forEach(renderInitialCard);
};

renderInitialCards();

/*функция для добавления новой карточки*/

function formSubmitHandlerPlace (evt) {
  evt.preventDefault(); 
  closeModalWindow(popupCard);
  const inputObject = { name: formInputName.value, link: formInputLink.value };
  renderInitialCard (inputObject);
  formInputName.value ='';
  formInputLink.value ='';
  };

const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', formSubmitHandlerPlace); 

/* функции удаления и лайка удаления карточки */
function handlerDelete (evt) {
  evt.target.closest('.element').remove();
};

function handlerLike (evt) {
  evt.target.classList.toggle('element__like_active');
};

function setEventElement(htmlElement) {
   const buttonDelete = htmlElement.querySelector('.element__trash'); 
   buttonDelete.addEventListener('click',handlerDelete); 

   const buttonLike = htmlElement.querySelector('.element__like'); 
   buttonLike.addEventListener('click',handlerLike);
}; 

/*попап с картинкой*/
const popupImage = document.querySelector('.popup_place_image');
const popupImageButtonOpen = document.querySelectorAll('.element__image');
const popupImageButtonClose = document.querySelector('.popup__close-button_place_image');
const popupImageActiveImage = document.querySelector('.popup__image');
const popupImageActiveTitle = document.querySelector('.popup__text');

/*открытие попапа с картинкой при нажатии на картинку карточки*/
function openPopupImage (evt) {
  openModalWindow (popupImage);
  popupImageActiveImage.src = evt.target.src;
  popupImageActiveImage.alt = evt.target.alt;
  popupImageActiveTitle.textContent = evt.target.parentElement.querySelector('.element__text').textContent;
}

popupImageButtonOpen.forEach(function(button){
  button.addEventListener('click',openPopupImage);
});

/*закрытие попапа с картинкой при нажатии на крестик*/
popupImageButtonClose.addEventListener('click', () => closeModalWindow(popupImage));