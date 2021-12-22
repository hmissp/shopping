import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/tab/My.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/logoin/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/cart/Shop.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../views/orderConfirmation/Order.vue')
  },
  {
    path: '/adress/:id',
    name: 'Adress',
    component: () => import('../views/adress/AdressList.vue')
  },
  {
    path: '/newadress',
    name: 'NewAdress',
    component: () => import('../views/newadress/newAdress.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/tab/Order.vue')
  },
  {
    path: '/shoppingcart',
    name: 'ShoppingCart',
    component: () => import('../views/tab/ShoppingCart.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (localStorage.user || (to.name === 'Login' || to.name === 'Register')) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
