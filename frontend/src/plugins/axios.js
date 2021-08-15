import Vue from 'vue';
import axios from 'axios';

const conf = {
  // baseURL: 'http://localhost:8080',
};

const axiosInstance = axios.create(conf);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

Plugin.install = (VueInstance) => {
  Object.defineProperties(VueInstance.prototype, {
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
