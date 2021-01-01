<template>
  <div class="hello">
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <div v-if="error"><sui-message warning>
      {{error}}
    </sui-message></div>
    <EventForm :form="form" @onFormSubmit="onFormSubmit" />
    <LargeLoader v-if="LargeLoader" />
    <EventList 
      :events="events" 
      @onDelete="onDelete" 
      @onEdit="onEdit"
      @toggle="toggle"
    />
  </div>
</template>

<script>
import axios from 'axios'
import EventForm from './Event/EventForm'
import EventList from './Event/EventList'
import LargeLoader from '../LargeLoader'


export default {
  name: 'Events',
  components: {
    EventForm,
    EventList,
    LargeLoader
  },
  data() {
    return {
      events: [],
      form: {
        eventName: '', 
        eventType: '', 
        eventDate: '',
        isEdit: false
      },
      LargeLoader: false,
      displayMessage: false,
      msgClass: 'ui green message',
      msg: '',
      token: localStorage.getItem('access_token'),
      error: null
    }
  },
  mounted() {
    this.getEvents(localStorage.getItem('access_token'))
  },
  methods: {
    getEvents(token) {
      this.LargeLoader = true
      this.$store.dispatch('loadEvents', {
        token
      })
      .then(response => {
        this.LargeLoader = false
        localStorage.setItem('access_token', token)
        this.events = response.data.data
        // this.$router.push({name: 'home'})
      }).catch((error) => {
          this.error = JSON.stringify(error.message)
          this.router.push("login")
      })
    },
    deleteEvent(id) {
      if(confirm("Do you really want to delete?")){
        this.LargeLoader = true
        axios.delete(`${this.getUrl}eventlist/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.LargeLoader = false
          this.successfullyDeleted = true
          this.msg = 'Event Deleted'
          this.msgClass = 'ui red message'
          this.displayMessage = true
          this.getEvents(localStorage.getItem('access_token'))
        })
        .catch(e => {
          alert(e)
        })
      }
    },
    createEvent(data) {
      this.LargeLoader = true
      axios.post(this.getUrl + 'eventlist', {
        venue_id: data.venue_id,
        eventName: data.eventName,
        eventType: data.eventType,
        eventDate: data.eventDate,
        eventTimeStart: data.eventTimeStart,
        eventTimeEnd: data.eventTimeEnd,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.LargeLoader = false
        this.msg = 'New Event Created'
        this.msgClass = 'ui green message'
        this.displayMessage = true
        this.getEvents(localStorage.getItem('access_token'))
      })
      .catch(e => {
        alert(e)
      })
    },
    editEvent(data) {
      this.LargeLoader = true
      axios.put(`${this.getUrl}eventlist/${data.id}`,{
        venue_id: data.venue_id,
        eventName: data.eventName,
        eventType: data.eventType,
        eventDate: data.eventDate,
        eventTimeStart: data.eventTimeStart,
        eventTimeEnd: data.eventTimeEnd,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.LargeLoader = false
        this.msg = 'Event Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        this.getEvents(localStorage.getItem('access_token'))
      }).catch((e) => {
        console.log('Error:', e)
      })
      
    },
    onDelete(id) {
      this.deleteEvent(id)
    },
    onEdit(data) {
      this.form = data
      this.form.isEdit = true
      this.displayMessage = false
    },
    toggle(data) {
      this.form = data
      this.form.isEdit = true
      this.displayMessage = false
    },
    onFormSubmit(data) {
      if (data.isEdit) {
        // edit Event
        this.editEvent(data)
      } else {
        //create event
        this.createEvent(data)
      }
    }
  },
  created () {
    // console.log('this is the token:', this.token)
    // this.getCustomers(this.token)
    //hide message
    this.msg = ''
    this.msgClass = 'ui red message'
    this.displayMessage = false
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.data {
  margin-top:15px;
}
thead tr th {
  background:#e0e0e0!important ;
}
.ui.inverted.dimmer {
  background-color: rgba(255, 255, 255, 0)!important;
}
</style>
