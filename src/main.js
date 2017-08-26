import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import Index from './views/index.vue';
import Goods from './views/goods.vue';
import Cart from './views/cart.vue';

import VueRouter from 'vue-router';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(VueRouter);
Vue.use(Element);
Vue.use(VueResource);

const routes = [
  {path: '/', redirect: '/index'},
  { path: '/index', component: Index },
  { path: '/index/:cateId', component: Index },
  { path: '/detail', component: Goods },
  { path: '/cart', component: Cart }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
});
