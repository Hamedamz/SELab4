import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import Signup from '../views/Signup.vue';

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

  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
];

export default routes;
