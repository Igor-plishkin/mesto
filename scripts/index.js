import { initialCards } from './initial-cards.js'
import Card from './Card.js'
import { ProfileEditionPopup } from './ProfileEditionPopup.js'
import { AddCardPopup } from './AddCardPopup.js'

const cardsGridTemplate = document.querySelector('.places');
const templateCardSelector = '.template__place';
const cardSelector = '.place';

const popupNewCard = new AddCardPopup(document.querySelector('.popup_add-place'));
const newPlaceBtn = document.querySelector('.profile__add-btn');

const popupProfile = new ProfileEditionPopup(document.querySelector('.popup_edit-profile'));
const btnEditorProfile = document.querySelector('.profile__edit-btn');

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function renderInitialCards(arr) {
  arr.forEach(item => {
    const cardItem = new Card(item.name, item.link, templateCardSelector, cardSelector)
    addCard(cardsGridTemplate, cardItem.getCard())
  });
}

function submitProfileFormHandler(event) {
  event.preventDefault();

  popupProfile.changeProfileData();

  popupProfile.closePopup();
}

function submitCardFormHandler(event) {
  event.preventDefault()

  const newItemCard = new Card(popupNewCard.InputName.value, popupNewCard.InputUrl.value, templateCardSelector, cardSelector);

  addCard(cardsGridTemplate, newItemCard.getCard());

  popupNewCard.form.reset();

  popupNewCard.closePopup();
}

btnEditorProfile.addEventListener('click', () => popupProfile.openPopup());
popupProfile.form.addEventListener('submit', submitProfileFormHandler);

newPlaceBtn.addEventListener('click', () => popupNewCard.openPopup());
popupNewCard.form.addEventListener('submit', submitCardFormHandler);

renderInitialCards(initialCards);

