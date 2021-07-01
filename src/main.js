import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import VueLoading from 'vuejs-loading-plugin'
// require('update-electron-app')()

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import CreateDID from '@/pages/CreateDID'
import Contacts from '@/pages/Contacts'
import Explorer from '@/pages/Explorer'
import Transactions from '@/pages/Transactions'
import Wallet from '@/pages/Wallet'

import store from './store'

import '@/assets/css/tailwind.css'

//  mainWindow.on('closed', function () {
//     kill(child.pid);
//     mainWindow = null;
//     app.quit();
//   })

Vue.config.productionTip = true

Vue.use(Router)
Vue.use(VueLoading)

const routes = [
  { path: '/', redirect: { name: 'DashboardHome' } },
  { path: '*', redirect: { name: 'DashboardHome' } },
  { path: '/auth', name: 'CreateDID', component: CreateDID },
  { path: '/wallet', component: Dashboard, children: [
      { path: '/', redirect: { name: 'DashboardHome' } },
      { path: 'home', name: 'DashboardHome', component: DashboardHome },
      { path: 'contacts', name: 'Contacts', component: Contacts },
      { path: 'explorer', name: 'Explorer', component: Explorer },
      { path: 'transactions', name: 'Transactions', component: Transactions },
      { path: 'my-wallet', name: 'Wallet', component: Wallet },
    ]
  },
]

const router = new Router({
  mode: 'hash',
  routes
})

// const jarPath = __dirname + '/extraResources/rubix_api.jar';
// const child = require('child_process').spawn(
//   'java', ['-jar', jarPath, '']
// );

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

