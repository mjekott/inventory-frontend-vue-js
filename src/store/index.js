import { createStore } from 'vuex';
import AuthService from '../services/AuthService';

export default createStore({
  state: {
    user: {
      id: null,
      name: '',
      email: '',
    },
    userLoggedIn: false,
  },
  mutations: {
    CURRENT_USER_FETCHED(state, user) {
      state.user.id = user.id;
      state.user.name = user.name;
      state.user.email = user.email;
    },
    TOGGLE_AUTH_STATUS(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async initialLoad(context) {
      if (localStorage.token) {
        const res = await AuthService.getUser();
        if (res) {
          context.commit('TOGGLE_AUTH_STATUS');
          context.commit('CURRENT_USER_FETCHED', res.data);
        }
      }
    },

    async login(context, payload) {
      const res = await AuthService.login(payload);
      localStorage.setItem('token', res.data.access_token);
      context.commit('TOGGLE_AUTH_STATUS');
      context.commit('CURRENT_USER_FETCHED', res.data.user);
    },

    async signup(context, payload) {
      const res = await AuthService.register(payload);
      localStorage.setItem('token', res.data.access_token);
      context.commit('TOGGLE_AUTH_STATUS');
      context.commit('CURRENT_USER_FETCHED', res.data.user);
    },
  },
  modules: {},
});
