import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'profile',
    component: Home,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

export default routes;
