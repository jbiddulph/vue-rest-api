<template>
  <div class="customer-list">
      <div class="data">
          <table class="ui celled table">
               <thead>
                   <tr>
                    <th style="width:50px; text-align:center">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th style="width:148px;">Action</th>
                   </tr>
               </thead>
                <tbody>
                    <Customer v-for="customer in customers" 
                        :key="customer.id" 
                        :customer="customer"
                        @onDelete="onDelete"
                        @onEdit="onEdit"
                    />
                </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import Customer from './Customer.vue'
export default {
  name: 'CustomerList',
  components: {
      Customer
  },
  props: {
      customers: {
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
