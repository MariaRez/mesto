import {
  initialCards,
  validationSettings,
  popupProfileButtonEdit,
  popupCardButtonAdd,
  formProfile,
  formCard,
  profileNewName,
  profileNewDescription,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

//открытие попапа для редактирования профиля
popupProfileButtonEdit.addEventListener("click", function () {
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.elementName;
  profileNewDescription.value = profileInfo.elementDescription;
  profileValidation.resetValidation();
});

//открытие попапа для добавления карточки
popupCardButtonAdd.addEventListener("click", function () {
  popupCard.open();
  cardValidation.resetValidation();
});

//валидация
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
profileValidation.enableValidation();
cardValidation.enableValidation();