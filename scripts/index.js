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

const initialCardsTemplate = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
const formButton = document.querySelector('.popup__field-button_place_card');
const formInputName = document.querySelector('.popup__field_type_placename');
const formInputLink = document.querySelector('.popup__field_type_placelink');

/*описываем функции для карточек из заданого массива*/
function renderInitialCard (element) {
  const htmlElement = initialCardsTemplate.cloneNode(true); 
  htmlElement.querySelector('.element__text').textContent = element.name; 
  const Image = htmlElement.querySelector('.element__image');
  Image.src = element.link;
  Image.alt = element.name;
  setEventElement(htmlElement); 
  elements.append(htmlElement);
};

const renderInitialCards = () => {
  initialCards.forEach(renderInitialCard);
};

renderInitialCards();

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

/*функция для добавления новой карточки*/
function addCard(nameValue,placeValue) {
  const cardElement = initialCardsTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = nameValue;
  const Image = cardElement.querySelector('.element__image');
  Image.src = placeValue;
  Image.alt = nameValue;
  setEventElement(cardElement); 
  elements.prepend(cardElement); 
}

function formSubmitHandlerPlace (evt) {
  evt.preventDefault(); 
  closeModalWindow(popupCard);
  addCard(formInputName.value,formInputLink.value);
  formInputName.value ='';
  formInputLink.value ='';
};

const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', formSubmitHandlerPlace); 