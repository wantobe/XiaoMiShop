import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import Index from './views/index';
import Goods from './views/goods';
import Cart from './views/cart';
import Order from './views/order';
import Address from './components/order/address';

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
  {path: '/cart', component: Cart},
  {path: '/order/:id', component: Order},
  {path: '/address/:action', component: Address}
];

const router = new VueRouter({
  routes
});

const data = {
  api: {
    category: 'http://rapapi.org/mockjsdata/25098/api/cate/', // 分类接口
    goods: 'http://rapapi.org/mockjsdata/25098/api/goods/',  // 首页测试接口
    detail: 'http://rapapi.org/mockjsdata/25098/api/detail/',  // 详情页测试接口
    banner: 'http://rapapi.org/mockjsdata/25098/api/banner/',  // 广告测试接口
    address: 'http://rapapi.org/mockjsdata/25098/api/address/{action}'  // 地址测试接口
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
