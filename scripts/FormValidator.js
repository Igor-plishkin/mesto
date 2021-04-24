export class FormValidator {

  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._buttonElement = this._form.querySelector(config.submitButtonSelector);
  }


  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);

    inputElement.classList.add(inputErrorClass);
  };

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);

    inputElement.classList.remove(inputErrorClass);
  };

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    const isInputValid = inputElement.validity.valid;

    if (isInputValid) {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
      const errorMessage = inputElement.validationMessage;

      this._showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
    }
  };

  _setEventListeners(formElement) {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, this._inputErrorClass, this._errorClass);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._form);
  }
}


