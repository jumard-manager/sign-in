import api from '@/local_modules/api';

const authStore = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    authtoken: null,
    username: null,
    issigned: false,
  },

  getters: {
    authtoken: state => state.authtoken,
    username: state => state.username,
    issigned: state => state.issigned,
  },

  mutations: {
    settkn (state, payload) {
      state.authtoken = payload.authtkn;
    },

    setusr (state, payload) {
      state.username = payload.user.username;
      state.issigned = true;
    },

    clear (state) {
      //state.username = null;
      state.issigned = false;
      state.authtoken = null;
    },
  },

  actions: {
    signin (context, payload) {
      console.log('echo ', context, payload);
      return api.post('/auth/token/login', {
        username: payload.username,
        password: payload.password
      })
      .then(res => {
        console.log('-----' + res.data.auth_token);
        context.commit('settkn', { authtkn: res.data.auth_token });
        return context.dispatch('reload').then(user => user);
      });
    },

    reload (context) {
      return api.get('/auth/users/me/').then(response => {
        const user = response.data;
        context.commit('setusr', { user: user });
        return user;
      });
    },

    signout (context) {
      context.commit('clear');
    },
  }

};
export default authStore;