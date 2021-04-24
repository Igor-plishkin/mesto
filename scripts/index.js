import { initialCards } from './initial-cards.js'
import Card from './Card.js'


const popupList = Array.from(document.querySelectorAll('.popup'));

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const btnEditorProfile = document.querySelector('.profile__edit-btn');
const newPlaceBtn = document.querySelector('.profile__add-btn');
// Поменял во все названия с place на card


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

function createCard(name, url) {
  const card = templateCard.cloneNode(true);
  const cardName = card.querySelector('.place__name');
  const cardImage = card.querySelector('.place__image');
  const cardLike = card.querySelector('.place__like');
  const cardDeleterBtn = card.querySelector('.place__delete-btn')


  cardName.textContent = name;
  cardImage.style.backgroundImage = `url(${url})`;

  cardImage.addEventListener('click', () => {

    openpZoomedCard(name, url);

  });

  cardLike.addEventListener('click', () => {

    cardLike.classList.toggle('place__like_active');

  });

  cardDeleterBtn.addEventListener('click', () => {

    card.remove();

  });

  return card;
}


function changeProfileData() {
  profileJob.textContent = profileInputJob.value;
  profileName.textContent = profileInputName.value;
}

function fillpopupProfile() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEscButton);
  document.addEventListener('click', closePopupByClickOnOverlay);
}

function openpZoomedCard(titleText, url) {
  zoomedImage.src = url;
  zoomedImage.alt = titleText;
  titleOfZoomedCard.textContent = titleText;

  openPopup(popupZoomedCard);
}

function closePopupByEscButton(event) {
  if (event.key === 'Escape') {
    popupList.forEach(popupItem => {
      if (popupItem.classList.contains('popup_opened')) {
        closePopup(popupItem);
      }
    });
  }
}

function closePopupByClickOnOverlay(event) {
  if (event.target.classList.contains('popup')) {
    popupList.forEach(popupItem => {
      if (popupItem.classList.contains('popup_opened')) {
        closePopup(popupItem);
      }
    });
  }
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEscButton);
  document.removeEventListener('click', closePopupByClickOnOverlay);
}

//Убрал лишние event.preventDefault(), т.к. в validate.js вешаются слушатели на submit форм вместе с отменой действий браузера
function submitProfileFormHandler(event) {
  changeProfileData();

  closePopup(popupProfile);
}

function submitCardFormHandler(event) {

  const newPlaceName = cardInputName.value;
  const newPlaceUrl = cardInputUrl.value;

  addCard(cardsGridTemplate, createCard(newPlaceName, newPlaceUrl));

  // Проблему с деактивацией кнопки при добавлении карточки реализовал в validate.js
  cardForm.reset();

  closePopup(popupCard);
}

btnEditorProfile.addEventListener('click', () => {

  fillpopupProfile();

  openPopup(popupProfile);
});
newPlaceBtn.addEventListener('click', () => openPopup(popupCard));

profileCloseBtn.addEventListener('click', () => closePopup(popupProfile));
cardCloseBtn.addEventListener('click', () => closePopup(popupCard));
zoomedCardCloseBtn.addEventListener('click', () => closePopup(popupZoomedCard));

profileForm.addEventListener('submit', submitProfileFormHandler);
cardForm.addEventListener('submit', submitCardFormHandler);

// Пришлось вызвать заполнение инпутов при загрузке страницы, чтобы корректноработала функция toggleButtonState при первом открытии попапа
fillpopupProfile();



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

