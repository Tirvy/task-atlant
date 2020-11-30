import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/desktop',
    name: 'Desktop',
    component: () => import(/* webpackChunkName: "desktop" */ '../views/Desktop.vue'),
  },
  {
    path: '/websockets',
    name: 'Websockets',
    component: () => import(/* webpackChunkName: "websockets" */ '../views/Websockets.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
