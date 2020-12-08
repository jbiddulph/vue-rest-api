import store from './stores/store'
import Vue from 'vue'
import VueRouter from 'vue-router'


import App from './App.vue'
import Frontpage from './components/Frontpage.vue'
import Home from './components/Home.vue'
import Register from './components/Auth/Register/Register.vue'
import Login from './components/Auth/Login/Login.vue'
import Logout from './components/Auth/Logout/Logout.vue'
import About from './components/about.vue'
import MyTasks from './components/Tasks/MyTasks.vue'


Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { 
    path: '/', 
    name: 'frontpage', 
    component: Frontpage,
    meta: {
      requiresvisitor: true
    }
  },
  { 
    path: '/home', 
    name: 'home', 
    component: Home,
    meta: {
      requiresvisitor: true
    }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login,
    meta: {
      requiresvisitor: true
    } 
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register,
    meta: {
      requiresvisitor: true
    } 
  },
  { path: '/logout', 
    name: 'logout', 
    component: Logout 
  },
  { path: '/my-tasks', 
    name: 'my-tasks', 
    component: MyTasks,
    meta: {
      requiresAuth: true
    } 
  },
  { 
    path: '/about', 
    name: 'about', 
    component: About,
    meta: {
      requiresvisitor: true
    }  
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
