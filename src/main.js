import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import axios from 'axios';
import { NavBar, Toast } from 'vant';
Vue.use(Router);
Vue.use(NavBar);
Vue.use(Toast);
Vue.prototype.$axios = axios;
Vue.prototype.baseUrl = '';

const carApply = () => import('@/views/carApply.vue');
const dispatchApply = () => import('@/views/dispatchApply.vue');

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
    }
  ]
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
