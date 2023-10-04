import axios from 'axios';
import store from '@/store';

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

api.interceptors.request.use(function (config) {
  store.dispatch('message/clearMessages');
  const token = store.getters['auth/authtoken'];
  if (token) {
    config.headers.Authorization = 'Token ' + token;
  }
  console.info('config ', config);
  return config;
  }, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  return response;
  }, function (error) {
    console.log('error.response=', error.response);
    const status = error.response ? error.response.status : 500;

    let message;
    if (status === 400) {
      const messages = [].concat.apply([], Object.values(error.response.data));
      store.dispatch('message/setWarningMessages', { messages: messages });
    } else if (status === 401) {
      const token = store.getters['auth/authtoken'];
      if (token != null) {
        message = 'Expired Token';
      } else {
        message = 'Invalid Token';
      }
      store.dispatch('auth/signout');
      store.dispatch('message/setErrorMessage', { message: message });
    } else if (status === 403) {
      message = 'Role Error';
      store.dispatch('message/setErrorMessage', { message: message });
    } else {
      message = 'Unknown Error';
      store.dispatch('message/setErrorMessage', { message: message });
    }
    return Promise.reject(error);
});

export default api;
