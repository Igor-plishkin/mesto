import {Popup} from './Popup.js'

export class ProfileEditionPopup extends Popup {
  static profileJob = document.querySelector('.profile__job');
  static profileName = document.querySelector('.profile__name');

  constructor(popupNode){
    super(popupNode);

    this.profileInputName = this._popupNode.querySelector('.popup__input_name');
    this.profileInputJob = this._popupNode.querySelector('.popup__input_job');

    this.form = this._popupNode.querySelector('.popup__form');
  }

  _fillPopupProfile() {
    this.profileInputName.value = ProfileEditionPopup.profileName.textContent;
    this.profileInputJob.value = ProfileEditionPopup.profileJob.textContent;
  }

  changeProfileData() {
    ProfileEditionPopup.profileJob.textContent = this.profileInputJob.value;
    ProfileEditionPopup.profileName.textContent = this.profileInputName.value;
  }

  openPopup(){
    this._fillPopupProfile();

    super.openPopup();
  }
}


