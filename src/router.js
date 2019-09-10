import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Content from './views/content/Content.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        title: '后台管理系统-登录',
      }
    },
    {
      path: '/',
      name: 'home',
      component: Content,
      meta: {
        title: '后台管理系统-首页',
      },
      children:[
        {path:'/', component:Home},
        {path:'/home', component:Home},
        {path:'/a', component:Home},
        ]
    },
  ],
});
