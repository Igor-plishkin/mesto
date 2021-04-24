import { initialCards } from './initial-cards.js'
import { Card } from './Card.js'
import { ProfileEditionPopup } from './ProfileEditionPopup.js'
import { AddCardPopup } from './AddCardPopup.js'
import { FormValidator } from './FormValidator.js'

const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const cardsGridTemplate = document.querySelector('.places');
const templateCardSelector = '.template__place';
const cardSelector = '.place';

const popupNewCard = new AddCardPopup(document.querySelector('.popup_add-place'));
const newPlaceBtn = document.querySelector('.profile__add-btn');

const popupProfile = new ProfileEditionPopup(document.querySelector('.popup_edit-profile'));
const btnEditorProfile = document.querySelector('.profile__edit-btn');

const profileValidator = new FormValidator(configValidation, popupProfile.form);
const cardValidator = new FormValidator(configValidation, popupNewCard.form);

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

  cardValidator.toggleButtonState();

  popupNewCard.closePopup();
}

btnEditorProfile.addEventListener('click', () => popupProfile.openPopup());
popupProfile.form.addEventListener('submit', submitProfileFormHandler);

newPlaceBtn.addEventListener('click', () => {
  cardValidator.toggleButtonState();

  popupNewCard.openPopup();
});
popupNewCard.form.addEventListener('submit', submitCardFormHandler);

renderInitialCards(initialCards);

profileValidator.enableValidation();
cardValidator.enableValidation();


