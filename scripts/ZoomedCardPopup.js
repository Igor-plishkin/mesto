import {Popup} from './Popup.js'

export class ZoomedCardPopup extends Popup {
  constructor(popupNode, titleText, url){
    super(popupNode);

    this._titleText = titleText;
    this._url = url;
  }

  openPopup(){
    const zoomedImage = this._popupNode.querySelector('.popup__place-image');
    const titleOfZoomedCard = this._popupNode.querySelector('.popup__place-title');

    zoomedImage.src = this._url;
    zoomedImage.alt = this._titleText;
    titleOfZoomedCard.textContent = this._titleText;

    super.openPopup();
  }
}


