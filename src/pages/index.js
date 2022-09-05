import "../pages/index.css";

import {
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
import { PopupWithConfirm } from "../components/PopupWithConfirm";

//запросы через токен и идентификатор
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "5a8f95ef-4485-42ab-852e-86340ac2e69c",
    "Content-Type": "application/json",
  },
});

let userId;

//информация о пользователе
const profile = new UserInfo({
  profileName: ".profile__name",
  profileAbout: ".profile__description",
  profileAvatar: ".profile__avatar-image",
});

//форма аватара пользователя
const popupAvatar = new PopupWithForm(".popup_place_avatar", {
  handleSubmit: handleSubmitAvatar,
});

//обработчик для аватара пользователя
function handleSubmitAvatar(data) {
  popupAvatar.renderLoading(true);
  api
    .editAvatar(data)
    .then((res) => {
      profile.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

//слушатели для попапа с аватаром пользователя
popupAvatar.setEventListeners();

//форма профиля пользователя
const popupProfile = new PopupWithForm(".popup_place_profile", {
  handleSubmit: handleSubmitProfile,
});

//обработчик для профиля пользователя
function handleSubmitProfile(data) {
  popupProfile.renderLoading(true);
  api
    .editProfile(data)
    .then((res) => {
      profile.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
}

//слушатели для попапа с профилем пользователя
popupProfile.setEventListeners();

//форма подтверждения удаления каточки
const popupDelete = new PopupWithConfirm(".popup_place_delete", {
  handleSubmit: () => {},
});

//слушатели для попапа удаления карточки
popupDelete.setEventListeners();

//форма создания (добавления) карточки
const popupCard = new PopupWithForm(".popup_place_card", {
  handleSubmit: handleSubmitCard,
});

//обработчик для создания (добавления) карточки
function handleSubmitCard(element) {
  popupCard.renderLoading(true);
  api
    .addNewCard(element)
    .then((res) => {
      const element = createCard(res);
      cards.addItem(element);
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
}

//слушатели для попапа создания (добавления) карточки
popupCard.setEventListeners();

//форма для большой картинки
const popupImage = new PopupWithImage(".popup_place_image");

//слушатели для попапа большой картинки
popupImage.setEventListeners();

//обработчик для открытия попапа с большой картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

//функция создания карточки (для всех карточек)
function createCard(data) {
  const card = new Card(data, ".elements-template", handleCardClick, {
    userId: userId,
    handleCardDelete: () => {
      popupDelete.open();
      popupDelete.setSubmitDelete({
        handleSubmitDelete: () => {
          api
            .deleteCard(data._id)
            .then(() => {
              card.deleteCardHandler();
              popupDelete.close();
            })
            .catch((err) => console.log(err));
        },
      });
    },
    handleMakeLike: () => {
      api
        .makeLike(data._id)
        .then((res) => {
          card.likeCounter(res.likes);
          card.makeLikeHandler();
        })
        .catch((err) => console.log(err));
    },
    handleDeleteLike: () => {
      api
        .deleteLike(data._id)
        .then((res) => {
          card.likeCounter(res.likes);
          card.deleteLikeHandler();
        })
        .catch((err) => console.log(err));
    },
  });

  const cardElement = card.createCard();
  return cardElement;
}

//секция для карточек
const cards = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cards.addItem(cardElement);
    },
  },
  ".elements"
);

//функция открытия попапа для редактирования аватара
function editAvatar() {
  popupAvatar.open();
  const profileInfo = profile.getUserInfo();
  profileNewAvatar.value = profileInfo.elementAvatar;
  avatarValidation.resetValidation();
}

//функция открытия попапа для редактирования профиля
function editProfile() {
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.elementName;
  profileNewDescription.value = profileInfo.elementAbout;
  profileValidation.resetValidation();
}

//функция открытия попапа для добавления карточки
function addCard() {
  popupCard.open();
  cardValidation.resetValidation();
}

//открытие попапа для редактирования аватара
popupAvatarButtonEdit.addEventListener("click", editAvatar);

//открытие попапа для редактирования профиля
popupProfileButtonEdit.addEventListener("click", editProfile);

//открытие попапа для добавления карточки
popupCardButtonAdd.addEventListener("click", addCard);

//данные
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profile.setUserInfo(userInfo);
    cards.setCardInfo(initialCards);
    cards.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

//раздел валидации
const avatarValidation = new FormValidator(validationSettings, formAvatar);
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();