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
  profileNewAvatar,
  profileNewName,
  profileNewDescription,
} from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const api = new Api({ //идеально
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '5a8f95ef-4485-42ab-852e-86340ac2e69c',
    'Content-Type': 'application/json'
  }
});

const profile = new UserInfo({ //идеально
  profileName: ".profile__name",
  profileDescription: ".profile__description",
  profileAvatar: ".profile__avatar-image",
});

//аватар пользователя
const popupAvatar = new PopupWithForm( //идеально
  ".popup_place_avatar",
  handleSubmitAvatar
);

function handleSubmitAvatar(data) { //идеально
  popupAvatar.renderLoading(true);
  api.setUserInfo(data)
  .then((res) => { 
    profile.setUserAvatar(res);
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatar.renderLoading(false)
  });
}

popupAvatar.setEventListeners(); //идеально

//профиль пользователя
const popupProfile = new PopupWithForm( //идеально
  ".popup_place_profile",
  handleSubmitProfile
);

function handleSubmitProfile(data) { //идеально
  popupProfile.renderLoading(true);
  api.setUserInfo(data)
  .then((res) => { 
    profile.setUserInfo(res);
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupProfile.renderLoading(false)
  });
}

popupProfile.setEventListeners(); //идеально

//функционал создания новой карточки
const popupCard = new PopupWithForm(".popup_place_card", handleSubmitCard); //!!!!!!!

function handleSubmitCard(item) { //!!!!!!!
  addCard(item);
  popupCard.close();
}

popupCard.setEventListeners(); //!!!!!!!
const popupImage = new PopupWithImage(".popup_place_image"); //!!!!!!!
popupImage.setEventListeners();//!!!!!!!

/*карточки*/
//функция для открытия попапа с большой картинкой
function handleCardClick(name, link) { //!!!!!!!
  popupImage.open(name, link);
}

function createCard(element) { ///!!!!!!!!
  const card = new Card(element, ".elements-template", handleCardClick);
  const cardElement = card.createCard(); //берем из класса

  return cardElement;
}

function addCard(item) { ///!!!!!!!
  const element = createCard(item);
  cards.addItem(element);
}
initialCards.reverse(); ///!!!!!!!

const cards = new Section( ///!!!!!!!
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
      addCard(item);
    },
  },
  ".elements"
);

cards.renderItems(); //!!!!!!!

//функция открытия попапа для редактирования аватара
function editAvatar () { //идеально
  popupAvatar.open();
  const profileInfo = profile.getUserInfo();
  profileNewAvatar.value = profileInfo.elementAvatar;
  avatarValidation.resetValidation();
};

//функция открытия попапа для редактирования профиля
function editProfile () { //идеально
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.elementName;
  profileNewDescription.value = profileInfo.elementDescription;
  profileValidation.resetValidation();
};

//открытие попапа для редактирования аватара - идеально
popupAvatarButtonEdit.addEventListener("click", editAvatar);

//открытие попапа для редактирования профиля - идеально
popupProfileButtonEdit.addEventListener("click", editProfile);

//открытие попапа для добавления карточки !!!!!!!
popupCardButtonAdd.addEventListener("click", function () {
  popupCard.open();
  cardValidation.resetValidation();
});

//валидация - идеально
const avatarValidation = new FormValidator(validationSettings, formAvatar);
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();