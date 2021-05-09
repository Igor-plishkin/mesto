export class Card {
  constructor(data, templateSelector, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    this.item = document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(true);

    this._cardTitle = this.item.querySelector('.place__name');
    this._cardImage = this.item.querySelector('.place__image');
    this._cardLike = this.item.querySelector('.place__like');
    this._cardDeleteBtn = this.item.querySelector('.place__delete-btn');

    this._cardTitle.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;
  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLike.addEventListener('click', () => {
      this._cardLike.classList.toggle('place__like_active');
    });

    this._cardDeleteBtn.addEventListener('click', () => {
      this.item.remove();
    });
  }

  getCard() {
    this._createCard();
    this._setEventListeners();

    return this.item;
  }
}
