import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import Signup from '../views/Signup.vue';
import Home from '../views/Home.vue';
import Tweets from '../views/Tweets.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },

  {
    path: '/user/:id',
    name: 'user',
    component: Tweets,
    props: (route) => ({
      userId: route.params.id,
    }),
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    },
  },

  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      admin: true,
    },
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      guest: true,
    },
  },
];

export default routes;
