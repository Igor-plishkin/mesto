import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__place-image');
    this._title = this._popup.querySelector('.popup__place-title');
  }

  open(titleText, url) {
    this._image.src = url;
    this._image.alt = titleText;
    this._title.textContent = titleText;

    super.open();
  }
}
