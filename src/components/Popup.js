export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._buttonClose = this._popup.querySelector('.popup__close-btn');

    this._bindedEscHandler = this._handleEscClose.bind(this);
    this._bindedOverlayHandler = this._handleClickOnOverlay.bind(this);
    this._bindedCloseBtnHandler = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');

    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');

    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._bindedEscHandler);
    document.addEventListener('click', this._bindedOverlayHandler);

    this._buttonClose.addEventListener('click', this._bindedCloseBtnHandler);
  }

  removeEventListeners(){
    document.removeEventListener('keydown', this._bindedEscHandler);
    document.removeEventListener('click', this._bindedOverlayHandler);

    this._buttonClose.removeEventListener('click', this._bindedCloseBtnHandler);
  }
}


