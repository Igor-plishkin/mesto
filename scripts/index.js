const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addPlaceBtn = document.querySelector('.profile__add-btn');

const places = document.querySelector('.places');
const templatePlace = document.querySelector('.template__place').content.querySelector('.place');

const profilePopup = document.querySelector('.popup_edit-profile');
const profileInputName = profilePopup.querySelector('.popup__input_name');
const profileInputJob = profilePopup.querySelector('.popup__input_job');
const profileCloseBtn = profilePopup.querySelector('.popup__close-btn');
const profileForm = profilePopup.querySelector('.popup__form');

const placePopup = document.querySelector('.popup_add-place');
const placeInputName = placePopup.querySelector('.popup__input_name');
const placeInputUrl = placePopup.querySelector('.popup__input_url');
const placeCloseBtn = placePopup.querySelector('.popup__close-btn');
const placeForm = placePopup.querySelector('.popup__form');

const zoomPopup = document.querySelector('.popup_zoom-place');
const zoomImagePopup = zoomPopup.querySelector('.popup__place-image');
const zoomTitlePopup = zoomPopup.querySelector('.popup__place-title');
const zoomCloseBtn = zoomPopup.querySelector('.popup__close-btn');

function createCard(name, url) {
  const place = templatePlace.cloneNode(true);
  const placeName = place.querySelector('.place__name');
  const placeImage = place.querySelector('.place__image');
  const placeLike = place.querySelector('.place__like');
  const placeDeleteBtn = place.querySelector('.place__delete-btn')


  placeName.textContent = name;
  placeImage.style.backgroundImage = `url(${url})`;

  placeImage.addEventListener('click', () => {

    openZoomPopup(name, url);

  });

  placeLike.addEventListener('click', () => {

    placeLike.classList.toggle('place__like_active');

  });

  placeDeleteBtn.addEventListener('click', () => {

    place.remove();

  });

  return place;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function renderInitialPlaces(arr) {
  arr.forEach(item => addCard(places, createCard(item.name, item.link)));
}

function changeProfileData() {
  profileJob.textContent = profileInputJob.value;
  profileName.textContent = profileInputName.value;
}

function fillProfilePopup() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function openZoomPopup(titleText, url) {
  zoomImagePopup.src = url;
  zoomImagePopup.alt = titleText;
  zoomTitlePopup.textContent = titleText;

  openPopup(zoomPopup);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

function submitProfileFormHandler(event) {

  event.preventDefault();

  changeProfileData();

  closePopup(profilePopup);
}

function submitPlaceFormHandler(event) {

  event.preventDefault();

  const newPlaceName = placeInputName.value;
  const newPlaceUrl = placeInputUrl.value;

  addCard(places, createCard(newPlaceName, newPlaceUrl));

  placeForm.reset();

  closePopup(placePopup);
}

renderInitialPlaces(initialCards);

editProfileBtn.addEventListener('click', () => {

  fillProfilePopup();

  openPopup(profilePopup);
});
addPlaceBtn.addEventListener('click', () => openPopup(placePopup));

profileCloseBtn.addEventListener('click', () => closePopup(profilePopup));
placeCloseBtn.addEventListener('click', () => closePopup(placePopup));
zoomCloseBtn.addEventListener('click', () => closePopup(zoomPopup));

profileForm.addEventListener('submit', submitProfileFormHandler);
placeForm.addEventListener('submit', submitPlaceFormHandler);

// Пришлось вызвать заполнение инпутов при загрузке страницы, чтобы корректноработала функция toggleButtonState при первом открытии попапа
fillProfilePopup();

