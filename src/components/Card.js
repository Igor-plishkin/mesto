export class Card {
  constructor(
    data,
    myId,
    templateSelector,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._owner = data.owner;
    this._myId = myId;

    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
  }

  _createCard() {
    this.item = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    this._cardTitle = this.item.querySelector(".place__name");
    this._cardImage = this.item.querySelector(".place__image");
    this._cardLike = this.item.querySelector(".place__like");
    this._cardDeleteBtn = this.item.querySelector(".place__delete-btn");
    this.counterLikes = this.item.querySelector(".place__counter");

    if (this._owner._id === this._myId) {
      this._cardDeleteBtn.classList.add("place__delete-btn_active");
    }

    this.counterLikes.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;

    if (this._isLiked()) {
      this._cardLike.classList.add("place__like_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLike.addEventListener("click", () => {
      this._handleLike(this.cardId, this._isLiked(), this.counterLikes);

      this._cardLike.classList.toggle("place__like_active");
    });

    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  _isLiked() {
    let isLiked;

    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        isLiked = true;
      }
    });

    return isLiked;
  }

  getId() {
    return this._cardId;
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
