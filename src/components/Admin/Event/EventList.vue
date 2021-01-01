<template>
  <div class="event-list">
      <div class="data">
          <table class="ui celled striped table">
               <thead>
                   <tr>
                    <th style="width:50px; text-align:center">#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th style="width:148px;">Action</th>
                   </tr>
               </thead>
                <tbody>
                    <Event v-for="event in events" 
                        :key="event.id" 
                        :event="event"
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
import Event from './Event'
import axios from 'axios'
export default {
  name: 'EventList',
  components: {
      Event
  },
  data() {
		return {
			// Our data object that holds the Laravel paginator data
      Events: {}
		}
	},
  props: {
      events: {
          type: Array
      }
  },
  methods: {
      getResults(page = 1) {
        axios.get(`${this.getUrl}eventlist?page=`+page, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          }
        }).then(response => {
          this.Events = response.data
        }).catch((e) => {
          console.log('Error:', e)
        })
      },
      onDelete (id) {
        this.$emit("onDelete", id)
      },
      onEdit (data) {
        this.$emit("onEdit", data)
      },
      toggle (data) {
        this.$emit("toggle", data)
      }
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
