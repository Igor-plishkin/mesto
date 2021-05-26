import './index.css';

import {
  configValidation,
  cardsGridTemplate,
  templateCardSelector,
  cardSelector,
  userInfoSelectors,
  popupZoomedSelector,
  popupProfileSelector,
  popupAddCardSelector,
  popupDeleteCardSelector,
  popupAvatarSelector
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';


const btnEditorProfile = document.querySelector('.profile__edit-btn');
const newPlaceBtn = document.querySelector('.profile__add-btn');
const avatarBtn = document.querySelector('.profile__avatar-btn');
// !!!!!!!!!!!!!!!!!!!
const api = new Api('4756f29e-7074-4b91-8a7b-c92b73652806', 'cohort-24');

api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  })
api.getUser()
  .then((data) => {
    userInfo.setUserInfo(data);
  }).catch((err) => {
    console.log(err);
  });
const userInfo = new UserInfo(userInfoSelectors);

const popupZoomedCard = new PopupWithImage(popupZoomedSelector);
const popupProfile = new PopupWithForm(popupProfileSelector, submitProfileFormHandler);
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitCardFormHandler);
const popupAvatar = new PopupWithForm(popupAvatarSelector, submitAvatarFormHandler);

const profileValidator = new FormValidator(configValidation, popupProfile.form);
const cardValidator = new FormValidator(configValidation, popupAddCard.form);
const avatarValidator = new FormValidator(configValidation, popupAvatar.form);

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createNewCard(item, templateCardSelector, cardSelector, openZoomedCard, handleDeleteCard, handleLikeCard));
  }
}, cardsGridTemplate);



function createNewCard(data, templateCardSelector, cardSelector, openZoomHandler, handleDeleteCard, handleLikeCard) {
  const cardItem = new Card(data, templateCardSelector, cardSelector, openZoomHandler, handleDeleteCard, handleLikeCard);

  return cardItem.getCard();
}

function addNewCard(inputsData) {
  cardList.addItem(createNewCard(inputsData, templateCardSelector, cardSelector, openZoomedCard, handleDeleteCard, handleLikeCard));
}

function changeProfileData(inputsData) {
  userInfo.setUserInfo(inputsData);
}

function fillPopupProfile() {
  popupProfile.setInputValues(userInfo.getUserInfo());
}
// Не придумал ничего лучше чем создавать каждый раз новый попап
function handleDeleteCard(element) {
  const popupDeleteCard = new PopupWithForm(popupDeleteCardSelector, () => {
    api.deleteCard(element.getId())
      .catch((err) => {
        console.log(err)
      });
    popupDeleteCard.close();
    element.removeCard();
  });

  popupDeleteCard.open();
}

function handleLikeCard(id, isLiked) {
  if (isLiked) {
    api.deleteLikeCard(id)
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.putLikeToCard(id)
      .catch((err) => {
        console.log(err);
      });
  }
}

function openZoomedCard(titleText, url) {
  popupZoomedCard.open(titleText, url)
}

function submitProfileFormHandler(data) {
  popupProfile.loading(true);

  api.setUser(data)
    .then(res => {
      changeProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.loading(false);
      popupProfile.close();
    });
}




function submitCardFormHandler(data) {
  popupAddCard.loading(true);

  api.setCard(data)
    .then(res => {
      addNewCard(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.loading(false);
      popupAddCard.close();
    });
}

function submitAvatarFormHandler(data) {
  popupAvatar.loading(true);

  api.setAvatar(data)
    .then((res) => {
      changeProfileData(res);
    }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.loading(false);
      popupAvatar.close();
    });
}

btnEditorProfile.addEventListener('click', () => {

  fillPopupProfile();

  profileValidator.toggleButtonState();

  popupProfile.open();
});

newPlaceBtn.addEventListener('click', () => {
  cardValidator.toggleButtonState();

  popupAddCard.open();
});

avatarBtn.addEventListener('click', () => {
  avatarValidator.toggleButtonState();

  popupAvatar.open();
})


profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();


