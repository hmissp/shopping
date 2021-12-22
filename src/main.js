import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Stepper, Dialog, Toast } from 'vant'
import 'normalize.css'
import './style/base.scss'
import './style/iconfont.css'
import 'vant/lib/index.css'
import './style/resetUI.scss'

createApp(App).use(store).use(router).use(Button).use(Stepper).use(Dialog).use(Toast).mount('#app')

// Dialog.confirm({
// //   title: '确认要离开收银台？',
//   message: '请尽快完成支付，否则将被取消',
//   confirmButtonColor: '#4FB0F9',
//   confirmButtonText: '确认支付',
//   cancelButtonText: '取消订单'
// })
//   .then((e) => {
//     // on confirm
//   })
//   .catch(() => {
//     // on cancel
//     store.commit('changeShow', false)
//   })
