import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import axios from 'axios';
import { NavBar, Toast } from 'vant';
Vue.use(Router);
Vue.use(NavBar);
Vue.use(Toast);
Vue.prototype.$axios = axios;
Vue.prototype.baseUrl = 'http://carsadmin.iyunfish.cn/';

const carApply = () => import('@/views/carApply.vue');
const dispatchApply = () => import('@/views/dispatchApply.vue');
const carPurchase = () => import('@/views/carPurchase.vue');
const carDisposal = () => import('@/views/carDisposal.vue');
const carTransfer = () => import('@/views/carTransfer.vue');
const success = () => import('@/views/success.vue');

const router = new Router({
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '/',
      name: 'carApply',
      component: carApply
    },
    {
      path: '/dispatchApply',
      name: 'dispatchApply',
      component: dispatchApply
    },
    {
      path: '/carPurchase',
      name: 'carPurchase',
      component: carPurchase
    },
    {
      path: '/carDisposal',
      name: 'carDisposal',
      component: carDisposal
    },
    {
      path: '/carTransfer',
      name: 'carTransfer',
      component: carTransfer
    },
    {
      path: '/success',
      name: 'success',
      component: success
    }
  ]
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
