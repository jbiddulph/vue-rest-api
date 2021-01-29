<template>
  <div id="app">
    <div class="ui fixed inverted menu vue-color">
      
      <div class="ui container">
        <a href="#" class="header item">Vue JS ith CRUD API</a>
        <div class="right menu">
          <div>
            <sui-dropdown text="File">
              <sui-dropdown-menu>
                <sui-dropdown-item>New</sui-dropdown-item>
                <sui-dropdown-item
                  >Open... <span class="description">ctrl + o</span></sui-dropdown-item
                >
                <sui-dropdown-item
                  >Save as... <span class="description">ctrl + s</span></sui-dropdown-item
                >
                <sui-dropdown-item
                  >Rename <span class="description">ctrl + r</span></sui-dropdown-item
                >
                <sui-dropdown-item>Make a copy</sui-dropdown-item>
                <sui-dropdown-item
                  ><sui-icon name="folder" />Move to folder</sui-dropdown-item
                >
                <sui-dropdown-item
                  ><sui-icon name="trash" />Move to trash</sui-dropdown-item
                >
                <sui-dropdown-divider />
                <sui-dropdown-item>Download as...</sui-dropdown-item>
              </sui-dropdown-menu>
            </sui-dropdown>
          </div>
          <div><router-link to="/" class="item">Home</router-link></div>
          <div><router-link to="/about" class="item">About</router-link></div>
          <!-- <div><router-link to="/dashboard" class="item">Dashboard</router-link></div> -->
          <div v-if="loggedIn"><router-link to="/dashboard" class="item">Todos</router-link></div>
          <div v-if="loggedIn"><router-link to="/artwork" class="item">Artwork</router-link></div>
          <!-- <div v-if="loggedIn"><router-link to="/events" class="item">Events</router-link></div>
          <div v-if="loggedIn"><router-link to="/venues" class="item">Venues</router-link></div>
          <div v-if="loggedIn"><router-link to="/venues/create" class="item">Venue Create</router-link></div> -->
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
