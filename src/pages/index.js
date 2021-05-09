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
    const cardItem = new Card(item, templateCardSelector, cardSelector, openZoomedCard);

    cardsList.addItem(cardItem.getCard());
  }
}, cardsGridTemplate);


function addNewCard(inputsData) {
  const newItemCard = new Card(inputsData, templateCardSelector, cardSelector, openZoomedCard);

  cardsList.addItem(newItemCard.getCard());
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

function submitProfileFormHandler(event) {
  event.preventDefault();

  changeProfileData(popupProfile.getInputValues());

  popupProfile.close();
}

function submitCardFormHandler(event) {
  event.preventDefault();

  addNewCard(popupAddCard.getInputValues());

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


