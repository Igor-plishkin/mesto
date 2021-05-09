import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);

    this.form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');

    this._submitHandler = submitHandler;
  }
  //Понял в таком ключе эту функцию, что она должна возвращать значения всех инпутов
  getInputValues() {
    const inputValues = [];

    this._inputs.forEach((input) => {
      const inputItem = {
        value: input.value,
        inputId: input.id,
      }
      inputValues.push(inputItem);
    });

    return this._transformToObj(inputValues);
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      switch (input.id) {
        case 'profile-name':
          input.value = data.name;
          break;
        case 'profile-job':
          input.value = data.about;
          break;
      }
    });
  }

  _transformToObj(arr) {
    const data = {}

    arr.forEach((input) => {
      switch (input.inputId) {
        case 'place-name':
          data.name = input.value;
          break;
        case 'place-url':
          data.link = input.value;
          break;
        case 'profile-name':
          data.name = input.value;
          break;
        case 'profile-job':
          data.about = input.value;
          break;
      }
    });

    return data;
  }

  setEventListeners() {
    this.form.addEventListener('submit', this._submitHandler)

    super.setEventListeners();
  }

  removeEventListeners() {
    this.form.removeEventListener('submit', this._submitHandler)

    super.removeEventListeners();
  }

  close() {
    this.form.reset();

    super.close();
  }
}
