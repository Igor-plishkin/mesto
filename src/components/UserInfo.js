export class UserInfo{
  constructor({userNameSelector, userAboutSelector}){
    this.userName = document.querySelector(userNameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo(){
    const userInfo = {
      profileName: this.userName.textContent,
      profileAbout: this.userAbout.textContent
    };

    return userInfo;
  }

  setUserInfo(data){
    this.userName.textContent = data.profileName;
    this.userAbout.textContent = data.profileAbout;
  }
}
