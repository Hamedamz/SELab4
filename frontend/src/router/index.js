import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// eslint-disable-next-line import/no-cycle
import checkAccess from './guard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(checkAccess);

export default router;
