import "../pages/index.css"; //импортировали css

import {
  initialCards,
  validationSettings,
  popupAvatarButtonEdit,
  popupProfileButtonEdit,
  popupCardButtonAdd,
  formProfile,
  formCard,
  formAvatar,
  avatar,
  newAvatar,
  profileNewName,
  profileNewDescription,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { data } from "autoprefixer";//////////////данные с сервера

//аватар пользователя
const popupAvatar = new PopupWithForm(
  ".popup_place_avatar",
  handleSubmitAvatar
);

function handleSubmitAvatar() {
  avatar.src = newAvatar.value;
  popupAvatar.close();
}

popupAvatar.setEventListeners();

//профиль пользователя
const popupProfile = new PopupWithForm(
  ".popup_place_profile",
  handleSubmitProfile
);

const profile = new UserInfo({
  profileName: ".profile__name",
  profileDescription: ".profile__description",
});

function handleSubmitProfile(data) {
  profile.setUserInfo(data);
  popupProfile.close();
}

popupProfile.setEventListeners();

//функционал создания новой карточки
const popupCard = new PopupWithForm(".popup_place_card", handleSubmitCard);

function handleSubmitCard(item) {
  addCard(item);
  popupCard.close();
}

popupCard.setEventListeners();
const popupImage = new PopupWithImage(".popup_place_image");
popupImage.setEventListeners();

/*карточки*/
//функция для открытия попапа с большой картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function createCard(element) {
  const card = new Card(element, ".elements-template", handleCardClick);
  const cardElement = card.createCard(); //берем из класса

  return cardElement;
}

function addCard(item) {
  const element = createCard(item);
  cards.addItem(element);
}
initialCards.reverse();

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
      addCard(item);
    },
  },
  ".elements"
);

cards.renderItems();
///////////////////////// пробуем отправлять запросы
function getItems () {
  fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
    headers: {
      authorization: '5a8f95ef-4485-42ab-852e-86340ac2e69c'
    }
  })
  .then((res) => {
    res.json().then((data) => console.log(data)) //что приходят данные
  })
  .catch(() => {
      alert("Не удалось загрузить карточки") //при ошибке
  })
};

getItems();
////////////////////////
//функция открытия попапа для редактирования профиля
function editProfile () {
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.elementName;
  profileNewDescription.value = profileInfo.elementDescription;
  profileValidation.resetValidation();
};

//открытие попапа для редактирования картинки
popupAvatarButtonEdit.addEventListener("click", function () {
  popupAvatar.open();
  avatarValidation.resetValidation();
});

//открытие попапа для редактирования профиля
popupProfileButtonEdit.addEventListener("click", editProfile);

//открытие попапа для добавления карточки
popupCardButtonAdd.addEventListener("click", function () {
  popupCard.open();
  cardValidation.resetValidation();
});

//валидация
const avatarValidation = new FormValidator(validationSettings, formAvatar);
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();