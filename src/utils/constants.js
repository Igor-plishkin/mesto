export const initialCards = [
  {
    cardName: 'Архыз',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    cardName: 'Челябинская область',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    cardName: 'Иваново',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    cardName: 'Камчатка',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    cardName: 'Холмогорский район',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    cardName: 'Байкал',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

export const cardsGridTemplate = '.places';
export const templateCardSelector = '.template__place';
export const cardSelector = '.place';

export const userInfoSelectors = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar-btn',
}

export const popupZoomedSelector = '.popup_zoom-place';
export const popupProfileSelector = '.popup_edit-profile';
export const popupAddCardSelector = '.popup_add-place';
export const popupDeleteCardSelector = '.popup_delete-card';
export const popupAvatarSelector = '.popup_avatar';

