<template>
  <div id="app">
    <div class="ui fixed inverted menu vue-color">
      
      <div class="ui container">
        <a href="#" class="header item">Vue JS ith CRUD API</a>
        <div class="right menu">
          <div><router-link to="/" class="item">Home</router-link></div>
          <div><router-link to="/about" class="item">About</router-link></div>
          <div><router-link to="/home" class="item">Dashboard</router-link></div>
          <div v-if="!loggedIn"><router-link to="/login" class="item">Login</router-link></div>
          <div v-if="!loggedIn"><router-link to="/register" class="item">Register</router-link></div>
          <div v-if="loggedIn"><router-link to="/logout" class="item">Logout</router-link></div>
        </div>
      </div>
    </div>

    <div class="ui main container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    getUrl() {
      return this.$store.getters.getUrl
    }
  }
}
</script>

<style>
.vue-color {
  background-color: #41b883!important;
}
.main.container {
  margin-top: 60px;
}
.submit-button {
  margin-top: 20px!important;
  float:right;
}
</style>
