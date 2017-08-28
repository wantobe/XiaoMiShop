import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import Index from './views/index';
import Goods from './views/goods';
import Cart from './views/cart';

import VueRouter from 'vue-router';
import Element from 'element-ui';
import '../static/element-theme/index.css';

Vue.use(VueRouter);
Vue.use(Element);
Vue.use(VueResource);

const routes = [
  {path: '/', redirect: '/index'},
  {path: '/index', component: Index},
  {path: '/index/:cateId', component: Index},
  {path: '/detail/:id', component: Goods},
  {path: '/cart', component: Cart}
];

const router = new VueRouter({
  routes
});

const data = {
  api: {
    category: 'http://rapapi.org/mockjsdata/25098/api/cate/', // 分类接口
    goods: 'http://rapapi.org/mockjsdata/25098/api/goods/'  // 首页测试接口
  }
};

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {App},
  data
});
