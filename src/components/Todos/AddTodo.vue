<template>
  <div>
      <h3>Add ToDo</h3>
      <h4>User ID: {{getUser.id}}</h4>
      <div class="add">
          <form @submit="onSubmit(todo)">
              <input type="text" v-model="todo.title" placeholder="Add Todo...">
              <input type="text" v-model="todo.body" placeholder="enter something...">
              
              <button :disabled="!isValid" @click.prevent="onSubmit(todo)">Add</button>
          </form>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Add",
    props: ['userid'],
    data() {
        return {
            todo: {
                title: '',
                body: '',
                created_by: 4,  
                completed: 0
            }
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        onSubmit(todo) {
            this.created_by = this.getUser.id
            this.addTodo(todo)
        }
    },
    computed: {
        isValid() {
            return this.todo.title !== '' && this.todo.body !== ''
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
