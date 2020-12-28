<template>
  <div class="venue-list">
      <div class="data">
          <table class="ui celled striped table">
               <thead>
                   <tr>
                    <th style="width:50px; text-align:center">#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th style="width:148px;">Action</th>
                   </tr>
               </thead>
                <tbody>
                    <Venue v-for="venue in venues" 
                        :key="venue.id" 
                        :venue="venue"
                        @onDelete="onDelete"
                        @onEdit="onEdit"
                        @toggle="toggle"
                    />
                </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import Venue from './Venue'
export default {
  name: 'VenueList',
  components: {
      Venue
  },
  props: {
      venues: {
          type: Array
      }
  },
  methods: {
      onDelete (id) {
        this.$emit("onDelete", id)
      },
      onEdit (data) {
        this.$emit("onEdit", data)
      },
      toggle (data) {
        this.$emit("toggle", data)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
