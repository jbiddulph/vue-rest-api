<template>  
    <div>
    </div>
</template>

<script>
export default {
  name: 'Logout',
  data() {
    return {
      jwtToken: localStorage.getItem('access_token')
    }
  },
  created() {
    this.logout(this.jwtToken)
  },
  methods: {
    logout(jwtToken) {
        this.$store.dispatch('destroyToken', { jwtToken })
    .then(response => {
        console.log('LOGOUTRES', response)
        this.$router.push({name: 'home'})
      })
    }
  }
}
</script>

<style scoped>

</style>