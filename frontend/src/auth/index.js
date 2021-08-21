import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import router from '../router';

const http = Vue.prototype.$axios;

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'auth_token';
const USER_ID_LOCAL_STORAGE_KEY = 'user_id';
const LOGOUT_REDIRECT_ROUTE_NAME = 'login';
const LOGIN_REDIRECT_ROUTE_NAME = 'home';

export class Auth {
  constructor() {
    this.state = Vue.observable({
      user: {},
      token: null,
      ready: false,
    });
  }

  get ready() {
    return this.state.ready;
  }

  get user() {
    return this.state.user.data;
  }

  get userId() {
    return this.state.user.data?.id;
  }

  get token() {
    return this.state.token;
  }

  get isAdmin() {
    return this.state.user.data?.role === 'admin';
  }

  async login(args) {
    const response = await http.post('/auth/login', args);
    return this.handleAuthRequestResponse(response);
  }

  async handleAuthRequestResponse(response) {
    const isAuthenticationSuccessful = response.status === 200;

    if (isAuthenticationSuccessful) {
      const { data: userTokenWithId } = response;
      return this.handleSuccessfulAuthentication(userTokenWithId);
    }

    return response;
  }

  async handleSuccessfulAuthentication({ id, token }) {
    await this.setupUser(id, token);
    router.replace({ name: LOGIN_REDIRECT_ROUTE_NAME });
  }

  async init() {
    const localAuthToken = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    const userId = localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY);

    if (localAuthToken && userId) {
      await this.setupUser(userId, localAuthToken, false);
    }

    this.state.ready = true;
  }

  async setupUser(id, token) {
    this.setAuthToken(token);
    localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, id);

    this.state.user = await http.get(`/profile/${id}`);
  }

  setAuthToken(token) {
    this.state.token = token;
    http.defaults.headers.common.Authorization = `token ${token}`;

    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
  }

  logout() {
    this.state.user = {};
    this.state.token = null;
    localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(USER_ID_LOCAL_STORAGE_KEY);
    http.defaults.headers.common.Authorization = '';
    router.replace({ name: LOGOUT_REDIRECT_ROUTE_NAME });
  }
}

export const authInstance = new Auth();
