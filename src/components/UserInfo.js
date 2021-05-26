export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this.userName = document.querySelector(userNameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
    this.userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this.userName.textContent,
      about: this.userAbout.textContent
    };

    return userInfo;
  }

  setUserInfo(data) {
    this.userName.textContent = data.name;
    this.userAbout.textContent = data.about;

    this.userAvatar.style.backgroundImage = `url('${data.avatar}')`;
  }
}
