import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);

    this.form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit-btn');

    this._submitHandler = submitHandler;
    this._bindedSubmitHandler = this._handleSubmit.bind(this);
  }

  loading(isLoading) {
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранение';
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  setEventListeners() {
    this.form.addEventListener('submit', this._bindedSubmitHandler);

    super.setEventListeners();
  }

  removeEventListeners() {
    this.form.removeEventListener('submit', this._bindedSubmitHandler);

    super.removeEventListeners();
  }

  close() {
    this.form.reset();

    super.close();
  }
}
