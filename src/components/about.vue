<template>
  <div class="hello">
    <h2>Hello About</h2>
    <h3>Here's the token: {{tkn}}</h3>
  </div>
</template>

<script>

export default {
  name: 'About',
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
