<template>  
    <tr>
        <td>{{task.id}}</td>
        <td>{{task.title}}</td>
        <td>{{task.details}}</td>
        <td>
            <button class="mini ui blue button" @click="onEdit()">Edit</button>
            <button class="mini ui red button" @click="onDelete()">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'MyTask',
  props: {
      task: {
          type: Object
      }
  },
  methods: {
      onDelete() {
        this.$emit("onDelete", this.task.id)
      },
      onEdit() {
        this.$emit("onEdit", this.task)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
