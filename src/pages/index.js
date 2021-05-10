import './index.css';

import {
  initialCards,
  configValidation,
  cardsGridTemplate,
  templateCardSelector,
  cardSelector,
  userInfoSelectors,
  popupZoomedSelector,
  popupProfileSelector,
  popupAddCardSelector
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const btnEditorProfile = document.querySelector('.profile__edit-btn');
const newPlaceBtn = document.querySelector('.profile__add-btn');

const userInfo = new UserInfo(userInfoSelectors);

const popupZoomedCard = new PopupWithImage(popupZoomedSelector);
const popupProfile = new PopupWithForm(popupProfileSelector, submitProfileFormHandler);
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitCardFormHandler);

const profileValidator = new FormValidator(configValidation, popupProfile.form);
const cardValidator = new FormValidator(configValidation, popupAddCard.form);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createNewCard(item, templateCardSelector, cardSelector, openZoomedCard));
  }
}, cardsGridTemplate);

function createNewCard(data, templateCardSelector, cardSelector, openZoomHandler){
  const cardItem = new Card(data, templateCardSelector, cardSelector, openZoomHandler);

  return cardItem.getCard();
}

function addNewCard(inputsData) {
  cardsList.addItem(createNewCard(inputsData, templateCardSelector, cardSelector, openZoomedCard));
}

function changeProfileData(inputsData) {
  userInfo.setUserInfo(inputsData);
}

function fillPopupProfile() {
  popupProfile.setInputValues(userInfo.getUserInfo());
}

function openZoomedCard(titleText, url) {
  popupZoomedCard.open(titleText, url)
}

function submitProfileFormHandler(data) {
  changeProfileData(data);

  popupProfile.close();
}

function submitCardFormHandler(data) {
  addNewCard(data);

  popupAddCard.close();
}

btnEditorProfile.addEventListener('click', () => {

  fillPopupProfile();

  profileValidator.toggleButtonState();

  popupProfile.open();
});

newPlaceBtn.addEventListener('click', () => {
  cardValidator.toggleButtonState();

  popupAddCard.open();
});

cardsList.renderItems();

profileValidator.enableValidation();
cardValidator.enableValidation();


