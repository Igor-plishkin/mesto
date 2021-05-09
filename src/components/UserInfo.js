export class UserInfo{
  constructor({userNameSelector, userAboutSelector}){
    this.userName = document.querySelector(userNameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo(){
    const userInfo = {
      name: this.userName.textContent,
      about: this.userAbout.textContent
    };

    return userInfo;
  }

  setUserInfo(data){
    this.userName.textContent = data.name;
    this.userAbout.textContent = data.about;
  }
}
