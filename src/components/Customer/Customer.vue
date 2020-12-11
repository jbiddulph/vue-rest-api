<template>  
    <tr>
        <td>{{data.customer.id}}</td>
        <td>{{data.customer.first_name}} {{data.customer.last_name}}</td>
        <td>{{data.customer.email}}</td>
        <td>
            <button class="mini ui blue button" @click="onEdit()">Edit</button>
            <button class="mini ui red button" @click="onDelete()">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'Customer',
  props: {
      customer: {
          type: Object
      }
  },
  methods: {
      onDelete() {
        this.$emit("onDelete", this.customer.id)
      },
      onEdit() {
        this.$emit("onEdit", this.customer)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
