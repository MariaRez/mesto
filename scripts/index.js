const editPopupProfileButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = document.querySelector('.popup__close-button_place_profile');
const popupProfile = document.querySelector('.popup_place_profile');
const formElement = document.querySelector('.form_place_profile');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('#name');
const profileNewDescription = document.querySelector('#description');
const popupCard = document.querySelector('.popup_place_card');
const addPopupCardButton = document.querySelector('.profile__add-button');
const closePopupCardButton = document.querySelector('.popup__close-button_place_card');

const toggleModalWindow = (popup) => {
  popup.classList.toggle('popup_opened');
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNewName.value;
    profileDescription.textContent = profileNewDescription.value;
    popupProfile.classList.remove('popup_opened');
};

editPopupProfileButton.addEventListener('click', () => toggleModalWindow(popupProfile));
closePopupProfileButton.addEventListener('click', () => toggleModalWindow(popupProfile));
formElement.addEventListener('submit', formSubmitHandler); 
addPopupCardButton.addEventListener('click', () => toggleModalWindow(popupCard));
closePopupCardButton.addEventListener('click', () => toggleModalWindow(popupCard));


const initialCards = [
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

const initialCardsTemplate = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
const formButton = document.querySelector('.popup__field-button_place_card');
const formInputname = document.querySelector('#placeName');
const formInputlink = document.querySelector('#link');

const renderInitialCards = () => {
  initialCards.forEach(renderInitialCard);
};

const renderInitialCard = (element) => {
  const htmlElement = initialCardsTemplate.cloneNode(true); 
  htmlElement.querySelector('.element__text').textContent = element.name; 
  htmlElement.querySelector('.element__image').src = element.link;
  htmlElement.querySelector('.popup__text').textContent = element.name; 
  htmlElement.querySelector('.popup__image').src = element.link;
  setEventElement(htmlElement); 
  elements.append(htmlElement);
};

function handlerDelete (evt) {
  evt.target.closest('.element').remove();
}

function handlerLike (evt) {
  evt.target.classList.toggle('element__like_active');
}

function handlertogglePopupImage (evt) {
  const htmlElement = evt.target.closest('.element');
  const popupImage = htmlElement.querySelector('.popup_place_image');
  toggleModalWindow(popupImage);
}

function setEventElement(htmlElement) {
   const deleteButton = htmlElement.querySelector('.element__trash'); 
   deleteButton.addEventListener('click',handlerDelete); 

   const likeButton = htmlElement.querySelector('.element__like'); 
   likeButton.addEventListener('click',handlerLike); 

   const openPopupImageButton = htmlElement.querySelector('.element__image'); 
   openPopupImageButton.addEventListener('click', handlertogglePopupImage);

   const closePopupImageButton = htmlElement.querySelector('.popup__close-button_place_image'); 
   closePopupImageButton.addEventListener('click', handlertogglePopupImage);
}; 

renderInitialCards();

const placeNewName = document.querySelector('#placeName');
const placeNewImage = document.querySelector('#link');

function addCard(nameValue,placeValue) {
  const cardElement = initialCardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = nameValue;
  cardElement.querySelector('.element__image').src = placeValue;
  cardElement.querySelector('.popup__text').textContent = nameValue;
  cardElement.querySelector('.popup__image').src = placeValue;
  setEventElement(cardElement); 
  elements.prepend(cardElement); 
}

function formSubmitHandlerPlace (evt) {
  evt.preventDefault(); 
  popupCard.classList.remove('popup_opened');
  addCard(placeNewName.value,placeNewImage.value);
  placeNewName.value ='';
  placeNewImage.value ='';
};


const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', formSubmitHandlerPlace); 