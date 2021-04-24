import {Popup} from './Popup.js'

export class AddCardPopup extends Popup {
  constructor(popupNode){
    super(popupNode);

    this.InputName = this._popupNode.querySelector('.popup__input_name');
    this.InputUrl = this._popupNode.querySelector('.popup__input_url');

    this.form = this._popupNode.querySelector('.popup__form');
  }
}

