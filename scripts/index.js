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
    popupProfile.classList.remove('popup_opened');
};

editPopupProfileButton.addEventListener('click', () => {
  openModalWindow(popupProfile)
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
});
closePopupProfileButton.addEventListener('click', () => closeModalWindow(popupProfile));
formElement.addEventListener('submit', formSubmitHandler); 
addPopupCardButton.addEventListener('click', () => openModalWindow(popupCard));
closePopupCardButton.addEventListener('click', () => closeModalWindow(popupCard));

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
  htmlElement.querySelector('.element__image').alt = element.name;
  htmlElement.querySelector('.popup__text').textContent = element.name; 
  htmlElement.querySelector('.popup__image').src = element.link;
  htmlElement.querySelector('.popup__image').alt = element.name;
  setEventElement(htmlElement); 
  elements.append(htmlElement);
};

function handlerDelete (evt) {
  evt.target.closest('.element').remove();
}

function handlerLike (evt) {
  evt.target.classList.toggle('element__like_active');
}

function handlerOpenPopupImage (evt) {
  const htmlElement = evt.target.closest('.element');
  const popupImage = htmlElement.querySelector('.popup_place_image');
  openModalWindow(popupImage);
}

function handlerClosePopupImage (evt) {
  const htmlElement = evt.target.closest('.element');
  const popupImage = htmlElement.querySelector('.popup_place_image');
  closeModalWindow(popupImage);
}

function setEventElement(htmlElement) {
   const deleteButton = htmlElement.querySelector('.element__trash'); 
   deleteButton.addEventListener('click',handlerDelete); 

   const likeButton = htmlElement.querySelector('.element__like'); 
   likeButton.addEventListener('click',handlerLike); 

   const openPopupImageButton = htmlElement.querySelector('.element__image'); 
   openPopupImageButton.addEventListener('click', handlerOpenPopupImage);

   const closePopupImageButton = htmlElement.querySelector('.popup__close-button_place_image'); 
   closePopupImageButton.addEventListener('click', handlerClosePopupImage);
}; 

renderInitialCards();


function addCard(nameValue,placeValue) {
  const cardElement = initialCardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = nameValue;
  cardElement.querySelector('.element__image').src = placeValue;
  cardElement.querySelector('.element__image').alt = nameValue;
  cardElement.querySelector('.popup__text').textContent = nameValue;
  cardElement.querySelector('.popup__image').src = placeValue;
  cardElement.querySelector('.popup__image').alt = nameValue;;
  setEventElement(cardElement); 
  elements.prepend(cardElement); 
}

function formSubmitHandlerPlace (evt) {
  evt.preventDefault(); 
  closeModalWindow(popupCard);
  addCard(formInputname.value,formInputlink.value);
  formInputname.value ='';
  formInputlink.value ='';
};


const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', formSubmitHandlerPlace); 