import axios from '@/http-common';

class AuthService {
  login(payload) {
    return axios.post('/auth/login', payload);
  }

  register(payload) {
    return axios.post('/auth/register', payload);
  }

  getUser() {
    return axios.post('/auth/me');
  }
}

export default new AuthService();
