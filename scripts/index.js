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
  document.addEventListener('keydown', closeEsc);// добавляем слушатель при открытом попапе - при нажатии закрываем попап
}

const closeModalWindow = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);// убираем слушатель
}

function submitHandlerFormProfile (evt) {
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
popupProfileButtonClose.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
closeModalWindow(popupProfile);
  }
});

formElement.addEventListener('submit', submitHandlerFormProfile); 
popupCardButtonAdd.addEventListener('click', () => openModalWindow(popupCard));
popupCardButtonClose.addEventListener('click', () => closeModalWindow(popupCard));

/* вторая часть функционала */

const initialCardsTemplate = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
const formButton = document.querySelector('.popup__button_place_card');
const formInputName = document.querySelector('.popup__field_type_placename');
const formInputLink = document.querySelector('.popup__field_type_placelink');

/*описываем функции для карточек из заданого массива*/
/*функция добавления массива*/
const prependToContainer = (container, element) => {
  container.prepend(element);
}

function createCard (element) {
  const htmlElement = initialCardsTemplate.cloneNode(true); 
  htmlElement.querySelector('.element__text').textContent = element.name; 
  const image = htmlElement.querySelector('.element__image');
  image.src = element.link;
  image.alt = element.name;
  setEventElement(htmlElement); 
  return htmlElement;
};
const reverseInitialCards = initialCards.reverse();

reverseInitialCards.forEach((element) => {
  prependToContainer(elements,createCard(element));
});

/*функция для добавления новой карточки*/

function submitHandlerFormPlace (evt) {
  evt.preventDefault(); 
  closeModalWindow(popupCard);
  const inputObject = { name: formInputName.value, link: formInputLink.value };
  createCard (inputObject);
  prependToContainer(elements, createCard (inputObject));
  formInputName.value ='';
  formInputLink.value ='';
  };

const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', submitHandlerFormPlace); 

/* функции удаления,лайка и открытия попапа карточки */
function deleteHandler (evt) {
  evt.target.closest('.element').remove();
};

function likeHandler (evt) {
  evt.target.classList.toggle('element__like_active');
};

function setEventElement(htmlElement) {
   const buttonDelete = htmlElement.querySelector('.element__trash'); 
   buttonDelete.addEventListener('click',deleteHandler); 

   const buttonLike = htmlElement.querySelector('.element__like'); 
   buttonLike.addEventListener('click',likeHandler);

   const buttonOpenImagePopup = htmlElement.querySelector('.element__image'); 
   buttonOpenImagePopup.addEventListener('click',openPopupImage);
}; 

/*попап с картинкой*/
const popupImage = document.querySelector('.popup_place_image');
const popupImageButtonOpen = document.querySelectorAll('.element__image');
const popupImageButtonClose = document.querySelector('.popup__close-button_place_image');
const popupImageActiveImage = document.querySelector('.popup__image');
const popupImageActiveTitle = document.querySelector('.popup__text');

function openPopupImage (evt) {
  openModalWindow (popupImage);
  popupImageActiveImage.src = evt.target.src;
  popupImageActiveImage.alt = evt.target.alt;
  popupImageActiveTitle.textContent = evt.target.alt;
}

/*закрытие попапа с картинкой при нажатии на крестик*/
popupImageButtonClose.addEventListener('click', () => closeModalWindow(popupImage));


// закрытие попапов по нажатию на overlay
const popups = Array.from(document.querySelectorAll('.popup')); //берем массив попапов

popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', function(evt) {
    if (evt.target === evt.currentTarget) {
      closeModalWindow(popupElement);
    }
  });
});

//закрытие попапов при нажатии на esc
function closeEsc(evt) {
  if (evt.key === "Escape"){
  const activePopup = document.querySelector('.popup_opened');
  closeModalWindow(activePopup);
}
};