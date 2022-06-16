const EditPopupButton = document.querySelector('.profile__edit-bottom');
const ClosePopupButton = document.querySelector('.popup__close-botton');
const Popup = document.querySelector('.popup');
const FormElement = document.querySelector('.popup__container')
const ProfileName = document.querySelector('.profile__name');
const ProfileDescription = document.querySelector('.profile__description');
const ProfileNewName = document.querySelector('.popup__field_type_name');
const ProfileNewDescription = document.querySelector('.popup__field_type_description');

function OpenPopup() {
    ProfileNewName.value = ProfileName.textContent;
    ProfileNewDescription.value = ProfileDescription.textContent;
    Popup.classList.add('popup_opened');
};

function ClosePopup() {
    Popup.classList.remove('popup_opened')
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    ProfileName.textContent = ProfileNewName.value;
    ProfileDescription.textContent = ProfileNewDescription.value;
    Popup.classList.remove('popup_opened');
}

EditPopupButton.addEventListener('click', OpenPopup);
ClosePopupButton.addEventListener('click', ClosePopup);
FormElement.addEventListener('submit', formSubmitHandler); 