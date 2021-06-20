class AppStorage {
  instance;

  constructor() {
    if (!this.instance) {
      this.instance = this;
    } else {
      return this.instance;
    }
  }

  storeToken(token) {
    this.localStorage.setItem('token', token);
  }

  storeUser(user) {
    this.localStorage.setItem('user', user);
  }

  store(token, user) {
    this.storeToken(token);
    this.storeUser(user);
  }

  getToken() {
    this.localStorage.getItem('token');
  }

  getUser() {
    this.localStorage.getItem('user');
  }
}

export default new AppStorage();
