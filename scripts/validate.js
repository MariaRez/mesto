const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    /*buttonElement.classList.remove('popup__button_active');*/
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.setAttribute('disabled', true)
  } else {
    /*buttonElement.classList.add('popup__button_active');*/
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.removeAttribute('disabled')
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement)
  });
}

validationSettings ={
  formElement: '.form',
  inputElement: '.popup__field',
  buttonElement: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__field_type_error',
  errorElement: '.error'
}

enableValidation(validationSettings);