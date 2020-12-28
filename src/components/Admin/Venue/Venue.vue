<template> 
    <tr>
        <td class="center">{{venue.id}}<br />
          <img :src=getBaseUrl+changeImgPath height="100" />
        </td>
        <td><h3>{{venue.venuename}}</h3>
        {{venue.address}} <br />
        <div v-if="venue.address2">{{venue.address2}} <br /></div>
        {{venue.town}} <br />
        {{venue.county}} <br />
        <small>{{venue.venuetype}}</small></td>
        <td>{{venue.address}}</td>
        <td>
            <i class="edit icon ui blue" @click="onEdit()"></i>
            <sui-button class="mini ui green button" @click="toggle()">Show Modal</sui-button>
            <sui-modal v-model="open">
            <sui-modal-header>Edit Venue</sui-modal-header>
            <sui-modal-content scrolling image>
              <div class="ui">
                <img class="ui small left floated image" :src=getBaseUrl+changeImgPath>
                <sui-modal-description>
                <sui-header>{{venue.venuename}} in {{venue.town}}, {{venue.county}}</sui-header>
                <p>Make changes to this venue by editing the form below</p>
                <br />
                <br />
                <br />
                </sui-modal-description>
                <VenueFullForm :venue="venue" @toggle="toggle" @onFormSubmit="onFormSubmit" />
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
import VenueFullForm from './VenueFullForm'
import axios from 'axios'

export default {
  name: 'Venue',
  components: {
    VenueFullForm
  },
  props: {
      venue: {
          type: Object
      }
  },
  data() {
    return {
      venues: [],
      open: false,
      form: {
        venuename: '', 
        venuetype: '', 
        address: '', 
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
    getVenues(token) {
      this.LargeLoader = true
      this.$store.dispatch('loadVenues', {
        token
      })
      .then(response => {
        this.LargeLoader = false
        localStorage.setItem('access_token', token)
        this.venues = response.data.data
        // this.$router.push({name: 'home'})
      }).catch((error) => {
          this.error = JSON.stringify(error.message)
      })
    },
    toggle(data) {
      console.log('DaTa here is undefined:', data)
      this.form = data
      this.open = !this.open;
      this.isEdit = true
      this.$emit("toggle", this.venue)
      this.displayMessage = false
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    onDelete() {
      this.$emit("onDelete", this.venue.id)
    },
    onEdit() {
      this.scrollToTop()
      this.$emit("onEdit", this.venue)
    },
    onFormSubmit(data) {
      
      this.editVenue(data)
    },
    editVenue(data) {
      this.LargeLoader = true
      axios.put(`${this.getUrl}venue/${data.id}`,{
        id: data.id,
        venuename: data.venuename,
        venuetype: data.venuetype,
        address: data.address,
        address2: data.address2,
        town: data.town,
        county: data.county,
        postcode: data.postcode,
        postalsearch: data.postalsearch,
        telephone: data.telephone,
        latitude: data.latitude,
        longitude: data.longitude,
        website: data.website,
        photo: data.photo,
        is_live: data.is_live
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.LargeLoader = false
        this.msg = 'Venue Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        console.log('still go token: ', localStorage.getItem('access_token'))
        this.getVenues(localStorage.getItem('access_token'))
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
      return this.venue.photo.replace(/^public\//, 'storage/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
