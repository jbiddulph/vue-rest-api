<template>
  <div class="hello">
    <h2>Hello About</h2>
    <Stats1 />
    <h3>Here's the token: {{tkn}}</h3>
  </div>
</template>

<script>
import Stats1 from './ui/Stats1'
export default {
  name: 'About',
  components: {
    Stats1
  },
  data: function () {
    return {
      tkn: localStorage.getItem('access_token')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
