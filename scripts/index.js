

let page = document.querySelector('.page')

let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let editBtn = document.querySelector('.profile__edit-btn')

let popup = document.querySelector('.popup')
let popupInputName = popup.querySelector('.popup__input-name')
let popupInputJob = popup.querySelector('.popup__input-job')
let popupCloseBtn = popup.querySelector('.popup__close-btn')
let popupSubmitBtn = popup.querySelector('.popup__submit-btn')



function openPopup(){
  popup.classList.add('popup_opened')

  popupInputName.value = profileName.textContent
  popupInputJob.value = profileJob.textContent
}

function closePopup(){
  popup.classList.remove('popup_opened')
}

function submitFormHandler(event){

  event.preventDefault()

  profileJob.textContent = popupInputJob.value
  profileName.textContent = popupInputName.value

  closePopup()
}

editBtn.addEventListener('click', openPopup)
popupCloseBtn.addEventListener('click', closePopup)
popupSubmitBtn.addEventListener('click', submitFormHandler)
