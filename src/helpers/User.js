import Token from './Token';
import AppStorage from './AppStorage';

class User {
  reposnseAfterLogin(res) {
    console.log(res);
    const { accessToken, username } = res.data;

    if (Token.isValid(accessToken)) {
      AppStorage.store(accessToken, username);
    }
  }

  hasToken() {
    const storeToken = AppStorage.getToken();
    if (storeToken) {
      return Token.isValid(storeToken);
    }
    return false;
  }

  loggedIn() {
    return this.hasToken();
  }
}

export default new User();
