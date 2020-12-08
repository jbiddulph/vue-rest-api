<template>
  <div class="task-list">
      <div class="data">
          <table class="ui celled table">
               <thead>
                   <tr>
                    <th style="width:50px; text-align:center">#</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th style="width:148px;">Action</th>
                   </tr>
               </thead>
                <tbody>
                    <MyTask v-for="task in tasks" 
                        :key="task.id" 
                        :task="task"
                        @onDelete="onDelete"
                        @onEdit="onEdit"
                    />
                </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import MyTask from './MyTask.vue'
export default {
  name: 'MyTask',
  components: {
      MyTask
  },
  props: {
      tasks: {
          type: Array
      }
  },
  methods: {
      onDelete (id) {
        this.$emit("onDelete", id)
      },
      onEdit (data) {
        this.$emit("onEdit", data)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
