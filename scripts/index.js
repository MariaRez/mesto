const popupProfileButtonEdit = document.querySelector('.profile__edit-button');
const popupProfileButtonClose = document.querySelector('.popup__close-button_place_profile');
const popupProfile = document.querySelector('.popup_place_profile');
const formElement = document.querySelector('.form_place_profile');
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const profileNewName = document.querySelector('.popup__field_type_name');
const profileNewDescription = document.querySelector('.popup__field_type_description');
const popupCard = document.querySelector('.popup_place_card');
const popupCardButtonAdd = document.querySelector('.profile__add-button');
const popupCardButtonClose = document.querySelector('.popup__close-button_place_card');

const openModalWindow = (popup) => {
  popup.classList.add('popup_opened');
}

const closeModalWindow = (popup) => {
  popup.classList.remove('popup_opened');
}

function submitHandlerFormProfile (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNewName.value;
    profileDescription.textContent = profileNewDescription.value;
    closeModalWindow(popupProfile);
};

popupProfileButtonEdit.addEventListener('click', () => {
  openModalWindow(popupProfile)
  profileNewName.value = profileName.textContent;
  profileNewDescription.value = profileDescription.textContent;
});
popupProfileButtonClose.addEventListener('click', () => closeModalWindow(popupProfile));
formElement.addEventListener('submit', submitHandlerFormProfile); 
popupCardButtonAdd.addEventListener('click', () => openModalWindow(popupCard));
popupCardButtonClose.addEventListener('click', () => closeModalWindow(popupCard));

/* вторая часть функционала */

const initialCardsTemplate = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
const formButton = document.querySelector('.popup__button_place_card');
const formInputName = document.querySelector('.popup__field_type_placename');
const formInputLink = document.querySelector('.popup__field_type_placelink');

/*описываем функции для карточек из заданого массива*/
/*функция добавления массива*/
const prependToContainer = (container, element) => {
  container.prepend(element);
}

function createCard (element) {
  const htmlElement = initialCardsTemplate.cloneNode(true); 
  htmlElement.querySelector('.element__text').textContent = element.name; 
  const image = htmlElement.querySelector('.element__image');
  image.src = element.link;
  image.alt = element.name;
  setEventElement(htmlElement); 
  return htmlElement;
};
const reverseInitialCards = initialCards.reverse();

reverseInitialCards.forEach((element) => {
  prependToContainer(elements,createCard(element));
});

/*функция для добавления новой карточки*/

function submitHandlerFormPlace (evt) {
  evt.preventDefault(); 
  closeModalWindow(popupCard);
  const inputObject = { name: formInputName.value, link: formInputLink.value };
  createCard (inputObject);
  prependToContainer(elements, createCard (inputObject));
  formInputName.value ='';
  formInputLink.value ='';
  };

const formCard = document.querySelector('.form_place_card');
formCard.addEventListener('submit', submitHandlerFormPlace); 

/* функции удаления,лайка и открытия попапа карточки */
function deleteHandler (evt) {
  evt.target.closest('.element').remove();
};

function likeHandler (evt) {
  evt.target.classList.toggle('element__like_active');
};

function setEventElement(htmlElement) {
   const buttonDelete = htmlElement.querySelector('.element__trash'); 
   buttonDelete.addEventListener('click',deleteHandler); 

   const buttonLike = htmlElement.querySelector('.element__like'); 
   buttonLike.addEventListener('click',likeHandler);

   const buttonOpenImagePopup = htmlElement.querySelector('.element__image'); 
   buttonOpenImagePopup.addEventListener('click',openPopupImage);
}; 

/*попап с картинкой*/
const popupImage = document.querySelector('.popup_place_image');
const popupImageButtonOpen = document.querySelectorAll('.element__image');
const popupImageButtonClose = document.querySelector('.popup__close-button_place_image');
const popupImageActiveImage = document.querySelector('.popup__image');
const popupImageActiveTitle = document.querySelector('.popup__text');

function openPopupImage (evt) {
  openModalWindow (popupImage);
  popupImageActiveImage.src = evt.target.src;
  popupImageActiveImage.alt = evt.target.alt;
  popupImageActiveTitle.textContent = evt.target.alt;
}

/*закрытие попапа с картинкой при нажатии на крестик*/
popupImageButtonClose.addEventListener('click', () => closeModalWindow(popupImage));


/*третий функционал*/
/*для профиля - аналогично необходимо сделать для места*/
formElement.addEventListener('submit', sendForm);
formElement.addEventListener('input', handlerInputForm); //для события инпута ввода данных в соотвествующей форме 
 
function sendForm (evt) {
  evt.preventDefault();
  const form = evt.target;
  if (form.checkValidity()) {
    console.log('Форма валидна') //здесь потом должна быть логика отправки данных на сервер
  } else {
    console.log('Форма не валидна')
  }
}

function handlerInputForm(evt){ //функция обработчик  инпута 
const curentForm = evt.currentTarget; // тот объект для которого мы выбрали подписку 
validateForm(curentForm);
validateInput(evt.target);
}

function validateForm(form) {
  const submitButton = form.querySelector('.popup__button')//находим кнопку(класс выбран для обеих кнопок - но сама по себе функция опирается на конкретную форму) для того чтобы делать ее активной или неактивной
  if (form.checkValidity()) { //если форма валидна, то для кнопки 
    submitButton.removeAttribute('disabled'); //удаляем атрибут у кнопки тем самым делаем ее активной
    submitButton.classList.add('popup__button_active'); //такого класса у меня нет - он отвечает за стиль когда кнопка должна быть активна - по заданию другой
    submitButton.classList.remove('popup__button_disabled'); //такого класса у меня нет - он отвечает за стиль когда кнопка должна быть неактивна - по заданию другой
     } else { // если форма не валидна (проверки не пройдены)
    submitButton.setAttribute('disabled',true); //добавить кнопку атрибут блокирующий доступ
    submitButton.classList.remove('popup__button_active');
    submitButton.classList.add('popup__button_disabled');
     }
} 

function validateInput (input){
   addCustomErrorMessage (input); //по заданию должны быть браузерные ошибки по умолчанию - необходимо удалить данную функцию
   const errorElement = input.parentNode.querySelector(`#${input.id}-error`); //находим элемент в который будем выводить сообщения об ошибке через айди инпута и спана
   errorElement.textContent = input.validationMessage;//текстовый контент внутри тега span по умолчанию от браузера
  }

function addCustomErrorMessage(input){ //функция для ошибок в инпут 
  input.setCustomValidity(''); //свойство передающее validationMessage то есть текстовый контент внутри тега span - ошибки 
  if (input.validity.valueMissing) { //все свойства можно узнать вывев в консоль input.validity в самом начале функции - для каждого случая описываем свою ситуацию: когда ничего не написано, когда короткая и тд
    input.setCustomValidity('Вы пропустили это поле.');
  }
  if ((input.validity.tooShort || input.validity.tooLong) && input.name === 'Name') { // для имени пользователя
    input.setCustomValidity('Должно быть от 2 до 40 символов.');
  }
  if ((input.validity.tooShort || input.validity.tooLong) && input.name === 'about') { // для описания
    input.setCustomValidity('Должно быть от 2 до 200 символов.');
  }
  if ((input.validity.tooShort || input.validity.tooLong) && input.name === 'name-card') { // для названия карточки
    input.setCustomValidity('Должно быть от 2 до 30 символов.');
  }
  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity('Должно быть ссылкой.');
  } //для url
}

/*функционал по вебинару второй формы*/
formCard.addEventListener('submit', sendForm);
formCard.addEventListener('input', handlerInputForm);

validateForm(formCard); //для проверки в самом начале - для этой формы обязательно