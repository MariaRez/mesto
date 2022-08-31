import "../pages/index.css"; //импортировали css

import {
  validationSettings,
  popupAvatarButtonEdit,
  popupProfileButtonEdit,
  popupCardButtonAdd,
  formProfile,
  formCard,
  formAvatar,
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

const api = new Api({ ///8
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '5a8f95ef-4485-42ab-852e-86340ac2e69c',
    'Content-Type': 'application/json'
  }
});

let userId; //8

const profile = new UserInfo({ //8
  profileName: ".profile__name",
  profileDescription: ".profile__description",
  profileAvatar: ".profile__avatar-image",
});

//аватар пользователя
const popupAvatar = new PopupWithForm( //8
  ".popup_place_avatar",
  {handleSubmit: handleSubmitAvatar}
);

function handleSubmitAvatar(data) { //8
  popupAvatar.renderLoading(true);
  api.editAvatar(data)
  .then((res) => { 
    profile.setUserInfo(res);
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatar.renderLoading(false)
  });
}

popupAvatar.setEventListeners(); //8

//профиль пользователя
const popupProfile = new PopupWithForm( //8
  ".popup_place_profile",
  {handleSubmit: handleSubmitProfile}
);

function handleSubmitProfile(data) { //8
  popupProfile.renderLoading(true);
  api.editProfile(data)
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

popupProfile.setEventListeners(); //8

//попап удаления
const popupDelete = new PopupWithConfirm (".popup_place_delete",  {handleSubmit: () => {},}); //8
popupDelete.setEventListeners(); //8

//функционал создания новой карточки
const popupCard = new PopupWithForm(".popup_place_card", {handleSubmit: handleSubmitCard}); //8

function handleSubmitCard(element) { //8
  popupCard.renderLoading(true);
  api.addNewCard(element)
  .then((res) => {
    const element = createCard(item);
    cards.addItem(element);
    popupCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupCard.renderLoading(false)
  });
}

popupCard.setEventListeners(); //8

const popupImage = new PopupWithImage(".popup_place_image");//8
popupImage.setEventListeners();//8

/*карточки*/
//функция для открытия попапа с большой картинкой
function handleCardClick(name, link) { //8
  popupImage.open(name, link);
}

function createCard(element) { //8
  const card = new Card(element, ".elements-template", handleCardClick, {
    userId: userId,
    handleCardDelete: () => {
      popupDelete.open();
      popupDelete.setSubmitDelete({
        handleSubmitDelete: () => {
          api.deleteCard(element._id)
          .then(() => {
            card.deleteCardHandler();
            popupDelete.close();
          })
          .catch((err) => console.log(err))
        }
      })
    },
    handleMakeLike: () => {
      api.makeLike(element._id)
      .then((res)=>{
        card.likeCounter(res.likes);
        card.makeLikeHandler();
      })
      .catch((err) => console.log(err))
    },
    handleDeleteLike: () => {
      api.deleteLike(element._id)
      .then((res)=>{
        card.likeCounter(res.likes);
        card. deleteLikeHandler();
      })
      .catch((err) => console.log(err))
    },
  });

  const cardElement = card.createCard(); //берем из класса
  return cardElement;
}

const cards = new Section( //8
  {
    items: [],
    renderer: (item) => {
      const element = createCard(item);
      cards.addItem(element);
    },
  },
  ".elements"
);

//функция открытия попапа для редактирования аватара
function editAvatar () { //8
  popupAvatar.open();
  avatarValidation.resetValidation();
};

//функция открытия попапа для редактирования профиля
function editProfile () { //8
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.name;
  profileNewDescription.value = profileInfo.description;
  profileValidation.resetValidation();
};

//открытие попапа для редактирования аватара - 8
popupAvatarButtonEdit.addEventListener("click", editAvatar);

//открытие попапа для редактирования профиля - 8
popupProfileButtonEdit.addEventListener("click", editProfile);

//открытие попапа для добавления карточки - 8
popupCardButtonAdd.addEventListener("click", function () {
  popupCard.open();
  cardValidation.resetValidation();
});

Promise.all([api.getUserInfo(), api.getInitialCards() ]) //8 set
.then(([userInfo, initialCards]) => {
  userId = userInfo._id;
  profile.setUserInfo(userInfo);
  cards.renderItems(initialCards.reverse()); 
})
.catch((err) => {
  console.log(err);
})

//валидация - идеально //8
const avatarValidation = new FormValidator(validationSettings, formAvatar);
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();