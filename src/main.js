import store from './stores/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue';


import App from './App.vue'
import Frontpage from './components/Frontpage.vue'
import Customers from './components/Customer/Customers.vue'
import Register from './components/Auth/Register/Register.vue'
import Login from './components/Auth/Login/Login.vue'
import Logout from './components/Auth/Logout/Logout.vue'
import About from './components/about.vue'
import MyTasks from './components/Tasks/MyTasks.vue'
import Venues from './components/Admin/Venues.vue'
import VenueCreate from './components/Admin/Venue/VenueCreate.vue'
import Events from './components/Admin/Events.vue'


Vue.use(VueRouter)
Vue.use(SuiVue);
Vue.config.productionTip = false
Vue.component('pagination', require('laravel-vue-pagination'))

const routes = [
  { 
    path: '/', 
    name: 'frontpage', 
    component: Frontpage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/dashboard', 
    name: 'home', 
    component: Customers,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/venues', 
    name: 'venues', 
    component: Venues,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/venues/create', 
    name: 'venuecreate', 
    component: VenueCreate,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/events', 
    name: 'events', 
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login,
    meta: {
      requiresVisitor: true
    } 
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register,
    meta: {
      requiresVisitor: true
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})