const editPopupButton = document.querySelector('.profile__edit-bottom');
const closePopupButton = document.querySelector('.popup__close-botton');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('.form__input_type_name');
const profileNewDescription = document.querySelector('.form__input_type_description');

function OpenPopup() {
    profileNewName.value = profileName.textContent;
    profileNewDescription.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
};

function ClosePopup() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNewName.value;
    profileDescription.textContent = profileNewDescription.value;
    popup.classList.remove('popup_opened');
};

editPopupButton.addEventListener('click', OpenPopup);
closePopupButton.addEventListener('click', ClosePopup);
formElement.addEventListener('submit', formSubmitHandler); 