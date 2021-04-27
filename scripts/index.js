import { initialCards } from './initial-cards.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

//Удалил лишние классы, взял реализацию функционала попапов из своей 6 работы

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

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const btnEditorProfile = document.querySelector('.profile__edit-btn');
const newPlaceBtn = document.querySelector('.profile__add-btn');

const popupProfile = document.querySelector('.popup_edit-profile');
const profileInputName = popupProfile.querySelector('.popup__input_name');
const profileInputJob = popupProfile.querySelector('.popup__input_job');
const profileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const profileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_add-place');
const cardInputName = popupCard.querySelector('.popup__input_name');
const cardInputUrl = popupCard.querySelector('.popup__input_url');
const cardCloseBtn = popupCard.querySelector('.popup__close-btn');
const cardForm = popupCard.querySelector('.popup__form');

const popupZoomedCard = document.querySelector('.popup_zoom-place');
const zoomedImage = popupZoomedCard.querySelector('.popup__place-image');
const titleOfZoomedCard = popupZoomedCard.querySelector('.popup__place-title');
const zoomedCardCloseBtn = popupZoomedCard.querySelector('.popup__close-btn');

const profileValidator = new FormValidator(configValidation, profileForm);
const cardValidator = new FormValidator(configValidation, cardForm);

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function renderInitialCards(arr) {
  arr.forEach(item => {
    const cardItem = new Card(item, templateCardSelector, cardSelector, openZoomedCard)
    addCard(cardsGridTemplate, cardItem.getCard())
  });
}

function changeProfileData() {
  profileJob.textContent = profileInputJob.value;
  profileName.textContent = profileInputName.value;
}

function fillpopupProfile() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
}

function openPopup(popupNode) {
  popupNode.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEscButton);
  document.addEventListener('click', closePopupByClickOnOverlay);
}

function openZoomedCard(titleText, url) {
  zoomedImage.src = url;
  zoomedImage.alt = titleText;
  titleOfZoomedCard.textContent = titleText;

  openPopup(popupZoomedCard);
}

function closePopupByEscButton(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

function closePopupByClickOnOverlay(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

function closePopup(popupNode) {
  popupNode.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEscButton);
  document.removeEventListener('click', closePopupByClickOnOverlay);
}


function submitProfileFormHandler(event) {
  event.preventDefault();

  changeProfileData();

  closePopup(popupProfile);
}

function submitCardFormHandler(event) {
  event.preventDefault()

  const cardData = {}

  cardData.name = cardInputName.value;
  cardData.link = cardInputUrl.value;

  const newItemCard = new Card(cardData, templateCardSelector, cardSelector, openZoomedCard);

  addCard(cardsGridTemplate, newItemCard.getCard());

  cardForm.reset();

  closePopup(popupCard);
}

btnEditorProfile.addEventListener('click', () => {

  fillpopupProfile();

  profileValidator.toggleButtonState();

  openPopup(popupProfile);
});

newPlaceBtn.addEventListener('click', () => {
  cardValidator.toggleButtonState();

  openPopup(popupCard);
});

profileCloseBtn.addEventListener('click', () => closePopup(popupProfile));
cardCloseBtn.addEventListener('click', () => closePopup(popupCard));
zoomedCardCloseBtn.addEventListener('click', () => closePopup(popupZoomedCard));

profileForm.addEventListener('submit', submitProfileFormHandler);
cardForm.addEventListener('submit', submitCardFormHandler);

renderInitialCards(initialCards);

profileValidator.enableValidation();
cardValidator.enableValidation();


