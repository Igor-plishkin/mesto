export class Card {
  constructor(data, templateSelector, cardSelector, handleCardClick, handleDeleteClick, handleLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;

    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
  }

  _createCard() {
    this.item = document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(true);

    this._cardTitle = this.item.querySelector('.place__name');
    this._cardImage = this.item.querySelector('.place__image');
    this._cardLike = this.item.querySelector('.place__like');
    this._cardDeleteBtn = this.item.querySelector('.place__delete-btn');
    this._counterLikes = this.item.querySelector('.place__counter');

    if (this._owner._id === '277211afcaba68c4a1bc502d') {
      this._cardDeleteBtn.classList.add('place__delete-btn_active')
    }

    this._counterLikes.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;

    if (this._isLiked()) {
      this._cardLike.classList.add('place__like_active');
    }
  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLike(this._id, this._isLiked());
      this._setCounter();
      this._cardLike.classList.toggle('place__like_active');
    });

    this._cardDeleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  _setCounter() {
    if (this._isLiked()) {
      this._counterLikes.textContent = this._likes.length - 1;
    } else {
      this._counterLikes.textContent = this._likes.length + 1;
    }
  }

  _isLiked() {
    let isLiked;

    this._likes.forEach(element => {
      if (element._id === '277211afcaba68c4a1bc502d') {
        isLiked = true;
      }
    })

    return isLiked
  }

  getId() {
    return this._id;
  }

  getCard() {
    this._createCard();
    this._setEventListeners();

    return this.item;
  }

  removeCard() {
    this.item.remove();
    this.item = null;
  }
}
