import Vue from 'vue';
import Vuex from 'vuex';
import PersistedState from 'vuex-persistedstate';

import authStore  from '@/stores/authStore';
import messageStore  from '@/stores/messageStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authStore,
    message: messageStore
  },
  plugins: [PersistedState()],
});

export default store;
