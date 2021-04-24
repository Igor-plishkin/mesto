export class Popup {

  static popupList = Array.from(document.querySelectorAll('.popup'));

  constructor(popupNode) {
    this._popupNode = popupNode;
  }

  _closePopupByClickOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
      Popup.popupList.forEach(popupItem => {
        if (popupItem.classList.contains('popup_opened')) {
          this.closePopup();
        }
      });
    }
  }

  _closePopupByEscButton(event) {
    if (event.key === 'Escape') {
      Popup.popupList.forEach(popupItem => {
        if (popupItem.classList.contains('popup_opened')) {
          this.closePopup();
        }
      });
    }
  }
  _closePopupByButton(event) {
    const closeBtn = this._popupNode.querySelector('.popup__close-btn');

    if (event.target === closeBtn) {
      Popup.popupList.forEach(popupItem => {
        if (popupItem.classList.contains('popup_opened')) {
          this.closePopup();
        }
      });
    }
  }

  _setEventListeners() {
    document.addEventListener('click', this._closePopupByButton.bind(this));
    document.addEventListener('keydown', this._closePopupByEscButton.bind(this));
    document.addEventListener('click', this._closePopupByClickOnOverlay.bind(this));
  }

  _removeEventlisteners() {
    document.removeEventListener('click', this._closePopupByButton.bind(this));
    document.removeEventListener('keydown', this._closePopupByEscButton.bind(this));
    document.removeEventListener('click', this._closePopupByClickOnOverlay.bind(this));
  }

  openPopup() {
    this._popupNode.classList.add('popup_opened');

    this._setEventListeners();
  }

  closePopup() {
    this._popupNode.classList.remove('popup_opened');

    this._removeEventlisteners();
  }
}








