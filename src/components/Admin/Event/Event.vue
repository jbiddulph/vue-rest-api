<template> 
    <tr>
        <td class="center">{{event.id}}<br />
          <img :src=getBaseUrl+changeImgPath height="100" />
        </td>
        <td><h3>{{event.eventName}}</h3>
        {{event.eventCost}} <br />
        <div>{{event.eventDate}} <br />
        {{event.eventTimeStart}} <br />
        {{event.eventTimeEnd}} <br /></div>
        <small>{{event.eventType}}</small></td>
        <td>Venue: {{event.venue_id}}</td>
        <td>
            <i class="edit icon ui blue" @click="onEdit()"></i>
            <sui-button class="mini ui green button" @click="toggle()">Show Modal</sui-button>
            <sui-modal v-model="open">
            <sui-modal-header>Edit Event</sui-modal-header>
            <sui-modal-content scrolling image>
              <div class="ui">
                <img class="ui small left floated image" :src=getBaseUrl+changeImgPath>
                <sui-modal-description>
                <sui-header>{{event.eventName}} Event Type: {{event.eventType}}, {{event.eventDate}}</sui-header>
                <p>Make changes to this event by editing the form below</p>
                <br />
                <br />
                <br />
                </sui-modal-description>
                <EventFullForm :event="event" @toggle="toggle" @onFormSubmit="onFormSubmit" />
              </div>
                
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="toggle">
                OK
                </sui-button>
            </sui-modal-actions>
            </sui-modal>
            <button class="mini ui orange button" @click="onFullEdit()">Edit</button>
            <button class="mini ui red button" @click="onDelete()">Delete</button>
        </td>
    </tr>
</template>

<script>
import EventFullForm from './EventFullForm'
import axios from 'axios'

export default {
  name: 'Event',
  components: {
    EventFullForm
  },
  props: {
      event: {
          type: Object
      }
  },
  data() {
    return {
      events: [],
      open: false,
      form: {
        eventName: '', 
        eventType: '', 
        eventDate: '',
        eventTimeStart: '', 
        eventTimeEnd: '', 
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
      })
    },
    toggle(data) {
      this.form = data
      this.open = !this.open;
      this.isEdit = true
      this.$emit("toggle", this.event)
      this.displayMessage = false
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    onDelete() {
      this.$emit("onDelete", this.event.id)
    },
    onEdit() {
      this.scrollToTop()
      this.$emit("onEdit", this.event)
    },
    onFormSubmit(data) {
      
      this.editEvent(data)
    },
    editEvent(data) {
      this.LargeLoader = true
      axios.put(`${this.getUrl}eventlist/${data.id}`,{
        id: data.id,
        venue_id: data.venue_id,
        eventName: data.eventName,
        eventType: data.eventType,
        eventDate: data.eventDate,
        eventTimeStart: data.eventTimeEnd,
        eventCost: data.eventCost,
        is_live: data.is_live
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.LargeLoader = false
        this.msg = 'Event Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        console.log('still go token: ', localStorage.getItem('access_token'))
        this.getEvents(localStorage.getItem('access_token'))
      }).catch((e) => {
        console.log('Error:', e)
      })
      
    },
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl
    },
    changeImgPath() {
      return this.event.eventPhoto.replace(/^public\//, 'storage/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
