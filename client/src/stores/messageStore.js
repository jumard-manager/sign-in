const messageStore = {
    strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    error: '',
    warnings: [],
    info: ''
  },
  getters: {
    error: state => state.error,
    warnings: state => state.warnings,
    info: state => state.info
  },
  mutations: {
    set (state, payload) {
    if (payload.error) {
        state.error = payload.error;
    }
    if (payload.warnings) {
        state.warnings = payload.warnings;
    }
    if (payload.info) {
        state.info = payload.info;
    }
    },
    clear (state) {
    state.error = '';
    state.warnings = [];
    state.info = '';
    }
  },
  actions: {
    setErrorMessage (context, payload) {
    context.commit('clear');
    context.commit('set', { error: payload.message });
    },
    setWarningMessages (context, payload) {
    context.commit('clear');
    context.commit('set', { warnings: payload.messages });
    },
    setInfoMessage (context, payload) {
    context.commit('clear');
    context.commit('set', { info: payload.message });
    },
    clearMessages (context) {
    context.commit('clear');
    }
  }
};

export default messageStore;