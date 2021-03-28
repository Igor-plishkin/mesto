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

function renderPlace(name, url) {
  const place = templatePlace.cloneNode(true);
  const placeName = place.querySelector('.place__name');
  const placeImage = place.querySelector('.place__image');
  const placeLike = place.querySelector('.place__like');
  const placeDeleteBtn = place.querySelector('.place__delete-btn');

  placeName.textContent = name;
  placeImage.style.backgroundImage = `url(${url})`;

  placeImage.addEventListener('click', () => {
    openZoomPopup(name, url);
  });

  placeLike.addEventListener('click', () => {

    if (placeLike.classList.contains('place__like_active')) {
      placeLike.classList.remove('place__like_active');
    } else {
      placeLike.classList.add('place__like_active');
    }

  });

  placeDeleteBtn.addEventListener('click', () => {
    place.remove()
  });

  places.prepend(place);
}

function renderInitialPlaces(arr) {
  arr.forEach(item => renderPlace(item.name, item.link));
}

function openProfilePopup() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;

  profilePopup.classList.add('popup_opened');
}

function openPlacePopup() {
  placePopup.classList.add('popup_opened');
}

function openZoomPopup(titleText, url) {
  zoomImagePopup.src = url;
  zoomImagePopup.alt = titleText;
  zoomTitlePopup.textContent = titleText;

  zoomPopup.classList.add('popup_opened');
}


function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

function closeZoomPopup() {
  zoomPopup.classList.remove('popup_opened');
}

function submitProfileFormHandler(event) {

  event.preventDefault();

  profileJob.textContent = profileInputJob.value;
  profileName.textContent = profileInputName.value;

  closeProfilePopup();
}

function submitPlaceFormHandler(event) {

  event.preventDefault();

  let newPlaceName = placeInputName.value;
  let newPlaceUrl = placeInputUrl.value;

  renderPlace(newPlaceName, newPlaceUrl);

  closePlacePopup();
}

renderInitialPlaces(initialCards);

editProfileBtn.addEventListener('click', openProfilePopup);
addPlaceBtn.addEventListener('click', openPlacePopup);

profileCloseBtn.addEventListener('click', closeProfilePopup);
placeCloseBtn.addEventListener('click', closePlacePopup);
zoomCloseBtn.addEventListener('click', closeZoomPopup);

profileForm.addEventListener('submit', submitProfileFormHandler);
placeForm.addEventListener('submit', submitPlaceFormHandler);

