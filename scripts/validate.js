
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput= (inputList) => inputList.some(inputElement => !inputElement.validity.valid);

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);

  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);

  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const isInputValid = inputElement.validity.valid;

  if (isInputValid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    const errorMessage = inputElement.validationMessage;

    showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

//что то мне кажется, я немного не правильно передаю параметры в функции))
  formList.forEach((formElement) =>
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  );
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
});
