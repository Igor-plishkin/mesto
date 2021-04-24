import { initialCards } from './initial-cards.js'
import Card from './Card.js'
import {ProfileEditionPopup} from './ProfileEditionPopup.js'
import {AddCardPopup} from './AddCardPopup.js'
import {Popup} from './Popup.js'

// const newPopup = new Popup(document.querySelector('.popup_add-place'))
// const popupList = Array.from(document.querySelectorAll('.popup'));

const popupNewCard = new AddCardPopup(document.querySelector('.popup_add-place'));
const newPlaceBtn = document.querySelector('.profile__add-btn');

newPlaceBtn.addEventListener('click', () => popupNewCard.openPopup());

popupNewCard.form.addEventListener('submit', submitCardFormHandler);

// Поменял во все названия с place на card



// const profileForm = popupProfile.querySelector('.popup__form');


// const cardCloseBtn = popupCard.querySelector('.popup__close-btn');
// const cardForm = popupCard.querySelector('.popup__form');

const popupProfile = new ProfileEditionPopup(document.querySelector('.popup_edit-profile'));
const btnEditorProfile = document.querySelector('.profile__edit-btn');

btnEditorProfile.addEventListener('click', () => popupProfile.openPopup());

popupProfile.form.addEventListener('submit', submitProfileFormHandler);

function submitProfileFormHandler(event) {
  event.preventDefault();

  popupProfile.changeProfileData();

  popupProfile.closePopup();
}

function submitCardFormHandler(event) {
  event.preventDefault()

  const newItemCard = new Card(popupNewCard.InputName.value, popupNewCard.InputUrl.value, templateCard, cardSelector);

  addCard(cardsGridTemplate, newItemCard.getCard());

  popupNewCard.form.reset();

  popupNewCard.closePopup();

}



const cardsGridTemplate = document.querySelector('.places');
const templateCard = '.template__place';
const cardSelector = '.place';

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function renderInitialCards(arr) {
  arr.forEach(item => {
    const cardItem = new Card(item.name, item.link, templateCard, cardSelector)
    addCard(cardsGridTemplate, cardItem.getCard())
  });
}

renderInitialCards(initialCards);

