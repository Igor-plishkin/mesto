import {ZoomedCardPopup} from './ZoomedCardPopup.js'

export default class Card {
  constructor(name, url, templateSelector, cardSelector) {
    this._name = name;
    this._url = url;
    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;

    this.item = document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(true);
  }

  _createCard() {
    const cardName = this.item.querySelector('.place__name');
    const cardImage = this.item.querySelector('.place__image');

    cardName.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._url})`;
  }

  _setEventListeners() {
    const cardImage = this.item.querySelector('.place__image');
    const cardLike = this.item.querySelector('.place__like');
    const cardDeleterBtn = this.item.querySelector('.place__delete-btn');

    cardImage.addEventListener('click', () => {
      const Popup = new ZoomedCardPopup(document.querySelector('.popup_zoom-place'), this._name, this._url);

      Popup.openPopup();
    });

    cardLike.addEventListener('click', () => {
      cardLike.classList.toggle('place__like_active');
    });

    cardDeleterBtn.addEventListener('click', () => {
      this.item.remove();
    });
  }

  getCard() {
    this._createCard();
    this._setEventListeners();

    return this.item;
  }
}
// function createCard(name, url) {
//   const card = templateCard.cloneNode(true);
//   const cardName = card.querySelector('.place__name');
//   const cardImage = card.querySelector('.place__image');
//   const cardLike = card.querySelector('.place__like');
//   const cardDeleterBtn = card.querySelector('.place__delete-btn');


//   cardName.textContent = name;
//   cardImage.style.backgroundImage = `url(${url})`;

//   cardImage.addEventListener('click', () => {

//     openpZoomedCard(name, url);

//   });

//   cardLike.addEventListener('click', () => {

//     cardLike.classList.toggle('place__like_active');

//   });

//   cardDeleterBtn.addEventListener('click', () => {

//     card.remove();

//   });

//   return card;
// }
