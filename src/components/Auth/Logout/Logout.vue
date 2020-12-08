<template>  
    <div>
    </div>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('destroyToken')
    .then(response => {
        console.log('LOGOUTRES', response)
        this.$router.push({name: 'home'})
      })
  },
  methods: {
    // logout() {
    //     this.$store.dispatch('destroyToken')
    // .then(response => {
    //     console.log('LOGOUTRES', response)
    //     this.$router.push({name: 'home'})
    //   })
    // }
  }
}
</script>

<style scoped>

</style>