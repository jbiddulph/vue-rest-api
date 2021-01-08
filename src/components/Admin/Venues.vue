<template>
  <div class="hello">
    <div v-if="displayMessage" :class="msgClass">{{ this.msg }}</div>
    <div v-if="error"><sui-message warning>
      {{error}}
    </sui-message></div>
    <VenueForm :form="form" @onFormSubmit="onFormSubmit" />
    <LargeLoader v-if="LargeLoader" />
    <VenuesFilter /> 
    <VenueList 
      :venues="venues" 
      @onDelete="onDelete" 
      @onEdit="onEdit"
      @toggle="toggle"
    />
    <div class="all-venues">
      <div v-for="venue in allVenues" :key="venue.id" class="venue">
        <sui-card>
          <sui-card-content>
            <sui-image
              src="static/images/avatar/small/elliot.jpg"
              shape="circular"
              size="mini"
            />
            {{venue.venuename}} <br />
            {{venue.address}} <br />
        <div v-if="venue.address2">{{venue.address2}} <br /></div>
        {{venue.town}} <br />
        {{venue.county}} <br />
        <small>{{venue.venuetype}}</small>
        <i @click="deleteVenue(venue.id)" class="trash alternate icon"></i>
          </sui-card-content>
           <!-- Image path -->
          <!-- <img :src=imgpath height="100" />
          <sui-image :src=imgpath /> -->
          <sui-card-content>
            <span slot="right"> <sui-icon name="heart outline" /> 17 likes </span>
            <sui-icon name="comment" /> 3 comments
          </sui-card-content>
          <sui-card-content extra>
            <sui-input
              placeholder="Add Comment"
              icon="heart outline"
              icon-position="left"
              transparent
            />
          </sui-card-content>
        </sui-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VenueForm from './Venue/VenueForm'
import VenueList from './Venue/VenueList'
import VenuesFilter from './Venue/VenuesFilter'
import LargeLoader from '../LargeLoader'
import { mapGetters, mapActions } from 'vuex' 

export default {
  name: 'Venues',
  components: {
    VenueForm,
    VenueList,
    VenuesFilter,
    LargeLoader
  },
  data() {
    return {
      venues: [],
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
      error: null,
      page: Number
    }
  },
  mounted() {
    this.getVenues(localStorage.getItem('access_token'))
  },
  methods: {
    ...mapActions(['fetchVenues', 'deleteVenue']),
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
          this.router.push("login")
      })
    },
    deleteVenue(id) {
      if(confirm("Do you really want to delete?")){
        this.LargeLoader = true
        axios.delete(`${this.getUrl}venue/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.LargeLoader = false
          this.successfullyDeleted = true
          this.msg = 'Venue Deleted'
          this.msgClass = 'ui red message'
          this.displayMessage = true
          this.getVenues(localStorage.getItem('access_token'))
        })
        .catch(e => {
          alert(e)
        })
      }
    },
    createVenue(data) {
      this.LargeLoader = true
      axios.post(this.getUrl + 'venues', {
        venuename: data.venuename,
        venuetype: data.venuetype,
        address: data.address,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.LargeLoader = false
        this.msg = 'New Venue Created'
        this.msgClass = 'ui green message'
        this.displayMessage = true
        this.getVenues(localStorage.getItem('access_token'))
      })
      .catch(e => {
        alert(e)
      })
    },
    editVenue(data) {
      this.LargeLoader = true
      axios.put(`${this.getUrl}venue/${data.id}`,{
        venuename: data.venuename,
        venuetype: data.venuetype,
        address: data.address,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(() => {
        this.LargeLoader = false
        this.msg = 'Venue Edited'
        this.msgClass = 'ui yellow message'
        this.displayMessage = true
        this.getVenues(localStorage.getItem('access_token'))
      }).catch((e) => {
        console.log('Error:', e)
      })
      
    },
    onDelete(id) {
      this.deleteVenue(id)
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
        // edit venue
        this.editVenue(data)
      } else {
        //create venue
        this.createVenue(data)
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
    this.fetchVenues()
  },
  computed: {
    getUrl() {
      return this.$store.getters.getUrl
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    ...mapGetters(['allVenues']),
    getBaseUrl() {
      return this.$store.getters.getBaseUrl
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
.all-venues {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
</style>
