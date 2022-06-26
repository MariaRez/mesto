const editPopupButton = document.querySelector('.profile__edit-bottom');
const closePopupButton = document.querySelector('.popup__close-botton_place_profile');
const popupProfile = document.querySelector('.popup_place_profile');
const formElement = document.querySelector('.form_place_profile');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('#name');
const profileNewDescription = document.querySelector('#description');
const popupCard = document.querySelector('.popup_place_card'); //попап для добавления новой карточки
const addPopupCardButton = document.querySelector('.profile__add-bottom'); //кнопка добавления новой карточки
const closePopupCardButton = document.querySelector('.popup__close-botton_place_card'); //кнопка закрытия попапа с новой карточкой
const cards = document.querySelector('.elements'); // константа для добавления разметки карточки
const cardTemplate = document.querySelector('.elements-template').content; // константа для добавления разметки карточки
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
  ]; //изначальньные карточки на странице 

  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = element.name;
    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.popup__text').textContent = element.name;// подпись картинки в попап ???
    cardElement.querySelector('.popup__image').src = element.link;// картинка в попап ???
    cardElement.querySelector('.element__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('element__like_active'); //реализована возможность ставить и убирать лайки
    })
    const popupImage =  cardElement.querySelector('.popup_place_image'); //нашли картинку в конкретной карточке
    cardElement.querySelector('.element__image').addEventListener('click', () => toggleModalWindow(popupImage));
    cards.append(cardElement);
}) // Шесть карточек «из коробки»

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

editPopupButton.addEventListener('click', () => toggleModalWindow(popupProfile));
closePopupButton.addEventListener('click', () => toggleModalWindow(popupProfile));
formElement.addEventListener('submit', formSubmitHandler); 
addPopupCardButton.addEventListener('click', () => toggleModalWindow(popupCard));
closePopupCardButton.addEventListener('click', () => toggleModalWindow(popupCard));