class Token {
  isValid(token) {
    const payload = this.payload(token);
    if (payload) {
      // eslint-disable-next-line operator-linebreak
      const newLocal =
        // eslint-disable-next-line operator-linebreak
        payload.iis === 'http://127.0.0.1:8080/api/auth/login' ||
        payload.iis === 'http://127.0.0.1:8080/api/auth/register';
      return newLocal;
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  static decode(payload) {
    return JSON.parse(atob(payload));
  }
}

export default new Token();
