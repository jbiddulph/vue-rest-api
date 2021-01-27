<template>
  <div>
      <h3>Add Artwork</h3>
      <h4>User ID: {{getUser.id}}</h4>
      <div class="add">
          <form @submit="onSubmit(artwork)">
              <input type="text" v-model="artwork.title" placeholder="Add Artwork...">
              <input type="text" v-model="artwork.description" placeholder="enter something...">
              
              <button :disabled="!isValid" @click.prevent="onSubmit(artwork)">Add</button>
          </form>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "AddArtwork",
    props: ['userid'],
    data() {
        return {
            artwork: {
                title: '',
                description: '',
                created_by: 0,  
                completed: 0
            }
        }
    },
    methods: {
        ...mapActions(['addArtwork']),
        onSubmit(artwork) {
            this.created_by = this.getUser.id
            this.addArtwork(artwork)
        }
    },
    computed: {
        isValid() {
            return this.artwork.title !== '' && this.artwork.description !== ''
        },
        ...mapGetters(['getUser'])
    }
}
</script>

<style scoped>
form {
    display: flex;
}
input[type="text"] {
    flex: auto;
    padding: 10px;
    border: 1px solid #41b883;
    outline: 0;
}
input[type="submit"] {
    flex: 2;
    background: #41b883;
    color: #ffffff;
    cursor: pointer;
}
</style>
