const editPopupButton = document.querySelector('.profile__edit-bottom');
const closePopupButton = document.querySelector('.popup__close-botton_place_profile');
const popup = document.querySelector('.popup_place_profile');
const formElement = document.querySelector('.form_place_profile');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('#name');
const profileNewDescription = document.querySelector('#description');
const popupCard = document.querySelector('.popup_place_card');
const addPopupCardButton = document.querySelector('.profile__add-bottom');
const closePopupCardButton = document.querySelector('.popup__close-botton_place_card');

function openPopup() {
    profileNewName.value = profileName.textContent;
    profileNewDescription.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNewName.value;
    profileDescription.textContent = profileNewDescription.value;
    popup.classList.remove('popup_opened');
};

function openCardPopup() {
    popupCard.classList.add('popup_opened');
};

function closeCardPopup() {
    popupCard.classList.remove('popup_opened');
};

editPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
addPopupCardButton.addEventListener('click', openCardPopup);
closePopupCardButton.addEventListener('click',closeCardPopup);