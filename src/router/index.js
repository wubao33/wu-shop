import Vue from 'vue'
import Router from 'vue-router'
import All from '../views/all/All.vue'
const Home=()=>import('../views/home/Home.vue');
const Sort=()=>import('../views/sort/Sort.vue');
const Cart=()=>import('../views/cart/Cart.vue');
const Mine=()=>import('../views/mine/Mine.vue');

const Order=()=>import('../views/order/Order');
const MyAddress=()=>import('../views/order/children/MyAddress');
const AddAddress=()=>import('../views/order/children/children/AddAddress')
const EditAddress=()=>import('../views/order/children/children/EditAddress')


//mine
const UserCenter = ()=> import('./../views/mine/children/UserCenter');

const Login=()=>import('../views/login/Login');
Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', redirect: '/all' },
    {
      path: '/all',
      name: 'all',
      component: All,
      children: [
        {path: '/all',redirect: '/all/home'},
        {path: 'home', name: 'home', component: Home,meta: { keepalive:true }},
        {path: 'sort', name: 'sort', component: Sort,meta: { keepalive:true }},
        {path: 'cart', name: 'cart', component: Cart},
        {
          path: 'mine',
          name: 'mine',
          component: Mine,
          children: [
            {path: 'userCenter',name: 'userCenter',component: UserCenter}, // 用户中心
          ]
        },
      ]
    },

    {
      path: '/Order',
      name: 'order',
      component: Order,
      children: [
        {
          path:'myAddress',
          name: 'myAddress',
          component: MyAddress,
          children: [
            {
              path:'addAddress',
              name: 'addAddress',
              component: AddAddress,
            },
            {
              path:'editAddress',
              name: 'editAddress',
              component: EditAddress,
            },
          ]
        },
      ]
    },
    {path: '/login',name: 'login',component: Login}

    ]
    })

