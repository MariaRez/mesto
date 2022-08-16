import {
  initialCards,
  validationSettings,
  popupProfileButtonEdit,
  popupCardButtonAdd,
  formProfile,
  formCard,
  profileNewName,
  profileNewDescription
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

/*попапы*/
const popupProfile = new PopupWithForm ( ".popup_place_profile", handleSubmitProfile );
const popupCard = new PopupWithForm (".popup_place_card", handleSubmitCard );
const popupImage = new PopupWithImage(".popup_place_image");

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();


/*профиль пользователя*/
const profile = new UserInfo({
  profileName:".profile__name",
  profileDescription:".profile__description"})


//функции
function handleCardClick(name,link) { //для попапа с картинкой
  popupImage.open(name,link);
};

function handleSubmitCard (item){  //когда длюавляется карточка
  addCard(item);
  popupCard.close();
};

function handleSubmitProfile (data){ //когда изменяем профиль
  profile.setUserInfo(data);
  popupProfile.close();
};

initialCards.reverse();

/*блок отрисовки элементов*/
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

function createCard(element) {
  const card = new Card(element, ".elements-template", handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

function addCard(item) {
  const element = createCard(item);
  cards.addItem(element);
}

popupProfileButtonEdit.addEventListener("click", function () {
  popupProfile.open();
  const profileInfo = profile.getUserInfo();
  profileNewName.value = profileInfo.elementName;
  profileNewDescription.value = profileInfo.elementDescription;
  profileValidation.resetValidation();
});

popupCardButtonAdd.addEventListener("click", function () {
  popupCard.open();
  cardValidation.resetValidation();
});

/*блок валидации*/
const profileValidation = new FormValidator(validationSettings, formProfile);
const cardValidation = new FormValidator(validationSettings, formCard);
profileValidation.enableValidation();
cardValidation.enableValidation();