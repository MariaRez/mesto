/* при нажании на кпонку "редактировать профиль" открывался попап и при нажатии на кнопку закрыть закрывался попап*/
const EditPopupButton = document.querySelector('.profile__edit-bottom'); /*нашли кнопку открывающую попап по классу*/
const ClosePopupButton = document.querySelector('.popup__close-botton'); /*нашли кнопку закрывающую попап по классу*/
const Popup = document.querySelector('.popup'); /*нашли попап по классу*/
function EditPopup() {
    Popup.classList.add('popup_opened');
}; /*описали функцию открытия - в данном случае попап становиться видимым за счет изменения свойства display*/
function ClosePopup() {
    Popup.classList.remove('popup_opened')
}; /*описали функцию закрытия*/
EditPopupButton.addEventListener('click', EditPopup); /*при наступлении события нажатия на кнопку редактировать производиться функция открытия*/
ClosePopupButton.addEventListener('click', ClosePopup); /*при наступлении события нажатия на кнопку закрыть производиться функция закрытия*/

/*при нажатии на кпопку "сохранить" текст введеный пользователем сохраняется в профиле*/
const SaveProfileButton = document.querySelector('.popup__field-button'); /*нашли кнопку сохранения по классу*/
const ProfileName = document.querySelector('.profile__name'); /*нашли имя профиля*/
const ProfileDescription = document.querySelector('.profile__description'); /*нашли описание профиля*/
const ProfileNewName = document.querySelector('.popup__field-name'); /*нашли поле для ввода нового имени*/
const ProfileNewDescription = document.querySelector('.popup__field-description'); /*нашли поле для ввода нового описания*/
function SaveProfileInformation (){
    ProfileName.textContent = ProfileNewName.value; /*текстовое содержание имени изменить на введеное пользователем в поле для нового имени*/
    ProfileDescription.textContent = ProfileNewDescription.value; /*текстовое содержание описания изменить на введеное пользователем в поле для нового описания*/
    Popup.classList.remove('popup_opened'); /*закрывается попап*/
}
SaveProfileButton.addEventListener('click', SaveProfileInformation); /*при нажатии на кнопку сохранить выполняется функция сохранения нового имени и описания*/